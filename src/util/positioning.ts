import {Placement as PopperPlacement} from '@popperjs/core/lib/enums';
import {Modifier} from '@popperjs/core/lib/types';
import {
  popperGenerator,
  defaultModifiers,
} from '@popperjs/core/lib/popper-lite';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';

const createPopper = popperGenerator({
  defaultModifiers: [...defaultModifiers, offset, flip, preventOverflow, arrow],
});

const placementSeparator = /\s+/;
const startPlacement = /-(top|left)$/;
const endPlacement = /-(bottom|right)$/;
const spacesRegExp = /  +/gi;

function convertPlacementToPopper(placement: Placement): PopperPlacement {
  return placement.replace(startPlacement, '-start').replace(endPlacement, '-end') as PopperPlacement;
}

function convertPlacementToBs(primary, secondary): Placement {
  let newPlacement = primary;
  if (secondary) {
    newPlacement += '-';
    if (primary === 'top' || primary === 'bottom') {
      newPlacement += secondary.replace('start', 'left').replace('end', 'right');
    } else {
      newPlacement += secondary.replace('start', 'top').replace('end', 'bottom');
    }
  }
  return newPlacement as Placement;
}

/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'left', 'right',
 *   'top-left', 'top-right',
 *   'bottom-left', 'bottom-right',
 *   'left-top', 'left-bottom',
 *   'right-top', 'right-bottom'.
 * */
export function positionElements(
    hostElement: HTMLElement, targetElement: HTMLElement, placement: string | Placement | PlacementArray,
    appendToBody?: boolean, baseClass?: string): Function {
  let placementVals: Array<Placement> =
      Array.isArray(placement) ? placement : placement.split(placementSeparator) as Array<Placement>;


  const allowedPlacements = [
    'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
    'right-top', 'right-bottom'
  ];

  // replace auto placement with other placements
  let hasAuto = placementVals.findIndex(val => val === 'auto');
  if (hasAuto >= 0) {
    allowedPlacements.forEach(function(obj) {
      if (placementVals.find(val => val.search('^' + obj) !== -1) == null) {
        placementVals.splice(hasAuto++, 1, obj as Placement);
      }
    });
  }

  const popperPlacements = placementVals.map((placement) => { return convertPlacementToPopper(placement); });

  let mainPlacement = popperPlacements.shift();

  const bsModifier: Partial<Modifier<any, any>> = {
    name: 'bootstrapClasses',
    enabled: true,
    phase: 'write',
    fn({state}) {
      if (baseClass) {
        const bsClassRegExp = new RegExp(baseClass + '-[a-z]+', 'gi');

        const targetElement: HTMLElement = state.elements.popper as HTMLElement;
        const placement = state.placement;

        let className = targetElement.className;

        // Remove old bootstrap classes
        className = className.replace(bsClassRegExp, '');

        // Add current placements
        const[primary, secondary] = placement.split('-');
        className += ` ${baseClass}-${primary}`;
        if (secondary) {
          className += ` ${baseClass}-${convertPlacementToBs(primary, secondary)}`;
        }

        // Remove multiple spaces
        className = className.trim().replace(spacesRegExp, ' ');

        // Reassign
        targetElement.className = className;
      }
    },
  };

  const popperInstance = createPopper(hostElement, targetElement, {
    placement: mainPlacement,
    modifiers: [
      bsModifier,
      {
        name: 'arrow',
        options: {
          padding: 5,
        },
      },
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: ({placement, reference, popper}) => {
            return baseClass === 'bs-popover' ? [0, 12] : [];
          },
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: popperPlacements,
        },
      },
      {
        name: 'preventOverflow',
      },
    ]
  });

  return () => popperInstance.destroy();
}

export type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' |
    'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export type PlacementArray = Placement | Array<Placement>| string;
