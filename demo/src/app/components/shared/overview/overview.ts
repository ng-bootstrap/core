export interface NgbdOverviewSection {
  title: string | false;
  fragment: string;
}

export interface NgbdOverview {
  [fragment: string]: NgbdOverviewSection;
}
