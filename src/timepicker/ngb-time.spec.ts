import {NgbTime} from './ngb-time';

describe('NgbTime', () => {

  it('should allow constructing new objects', () => {
    expect(new NgbTime(undefined, undefined).toString()).toBe('0:0:0');
    expect(new NgbTime(12, 31, 45).toString()).toBe('12:31:45');
  });

  it('should allow changing hours', () => {
    const t = new NgbTime(10, 30);
    expect(t.toString()).toBe('10:30:0');

    t.changeHour(1);
    expect(t.toString()).toBe('11:30:0');

    t.changeHour(5);
    expect(t.toString()).toBe('16:30:0');

    t.changeHour(-2);
    expect(t.toString()).toBe('14:30:0');
  });

  it('should properly change undefined hours', () => {
    const t = new NgbTime(undefined, 30);

    t.changeHour(1);
    expect(t.toString()).toBe('1:30:0');
  });

  it('should allow changing hours with rolling', () => {
    const t = new NgbTime(23, 30);
    expect(t.toString()).toBe('23:30:0');

    t.changeHour(1);
    expect(t.toString()).toBe('0:30:0');

    t.changeHour(-5);
    expect(t.toString()).toBe('19:30:0');

    t.changeHour(6);
    expect(t.toString()).toBe('1:30:0');

    t.changeHour(26);
    expect(t.toString()).toBe('3:30:0');
  });

  it('should allow changing hours with rolling around 0', () => {
    const t = new NgbTime(0, 30);
    expect(t.toString()).toBe('0:30:0');

    t.changeHour(-48);
    expect(t.toString()).toBe('0:30:0');
  });

  it('should allow changing minutes', () => {
    const t = new NgbTime(10, 30);
    expect(t.toString()).toBe('10:30:0');

    t.changeMinute(1);
    expect(t.toString()).toBe('10:31:0');

    t.changeMinute(5);
    expect(t.toString()).toBe('10:36:0');

    t.changeMinute(-2);
    expect(t.toString()).toBe('10:34:0');
  });

  it('should properly change undefined minutes', () => {
    const t = new NgbTime(1, undefined);

    t.changeMinute(0);
    expect(t.toString()).toBe('1:0:0');
  });

  it('should allow changing minutes with rolling', () => {
    const t = new NgbTime(10, 30);
    expect(t.toString()).toBe('10:30:0');

    t.changeMinute(41);
    expect(t.toString()).toBe('11:11:0');

    t.changeMinute(121);
    expect(t.toString()).toBe('13:12:0');

    t.changeMinute(-122);
    expect(t.toString()).toBe('11:10:0');
  });

  it('should allow changing minutes with rolling around zero boundaries', () => {
    const t = new NgbTime(0, 30);
    expect(t.toString()).toBe('0:30:0');

    t.changeMinute(-40);
    expect(t.toString()).toBe('23:50:0');

    t.changeMinute(50);
    expect(t.toString()).toBe('0:40:0');

    t.changeMinute(24 * 60);
    expect(t.toString()).toBe('0:40:0');

    t.changeMinute(-48 * 60);
    expect(t.toString()).toBe('0:40:0');
  });

  it('should allow changing seconds', () => {
    const t = new NgbTime(10, 30, 30);
    expect(t.toString()).toBe('10:30:30');

    t.changeSecond(1);
    expect(t.toString()).toBe('10:30:31');

    t.changeSecond(5);
    expect(t.toString()).toBe('10:30:36');

    t.changeSecond(-6);
    expect(t.toString()).toBe('10:30:30');
  });

  it('should properly change undefined seconds', () => {
    const t = new NgbTime(1, 20, undefined);

    t.changeSecond(30);
    expect(t.toString()).toBe('1:20:30');
  });

  it('should allow changing seconds with rolling', () => {
    const t = new NgbTime(10, 30, 30);
    expect(t.toString()).toBe('10:30:30');

    t.changeSecond(60);
    expect(t.toString()).toBe('10:31:30');

    t.changeSecond(60 * 60);
    expect(t.toString()).toBe('11:31:30');

    t.changeSecond(-60 * 60);
    expect(t.toString()).toBe('10:31:30');
  });

  it('should allow changing seconds with rolling around zero boundaries', () => {
    const t = new NgbTime(0, 0, 30);
    expect(t.toString()).toBe('0:0:30');

    t.changeSecond(-40);
    expect(t.toString()).toBe('23:59:50');

    t.changeSecond(110);
    expect(t.toString()).toBe('0:1:40');

    t.changeMinute(24 * 3600);
    expect(t.toString()).toBe('0:1:40');

    t.changeMinute(-24 * 3600);
    expect(t.toString()).toBe('0:1:40');
  });

  it('should allow updating hours', () => {
    const t = new NgbTime(0, 0, 30);
    expect(t.toString()).toBe('0:0:30');

    t.updateHour(11);
    expect(t.toString()).toBe('11:0:30');
  });

  it('should allow updating hours with rolling', () => {
    const t = new NgbTime(0, 0, 30);
    expect(t.toString()).toBe('0:0:30');

    t.updateHour(25);
    expect(t.toString()).toBe('1:0:30');
  });

  it('should allow updating minutes', () => {
    const t = new NgbTime(11, 0, 30);
    expect(t.toString()).toBe('11:0:30');

    t.updateMinute(40);
    expect(t.toString()).toBe('11:40:30');
  });

  it('should allow updating minutes with rolling', () => {
    const t = new NgbTime(11, 30, 30);
    expect(t.toString()).toBe('11:30:30');

    t.updateMinute(90);
    expect(t.toString()).toBe('12:30:30');

    t.updateMinute(-120);
    expect(t.toString()).toBe('10:0:30');
  });

  it('should allow updating seconds', () => {
    const t = new NgbTime(11, 0, 30);
    expect(t.toString()).toBe('11:0:30');

    t.updateSecond(40);
    expect(t.toString()).toBe('11:0:40');
  });

  it('should allow updating seconds with rolling', () => {
    const t = new NgbTime(11, 0, 30);
    expect(t.toString()).toBe('11:0:30');

    t.updateSecond(70);
    expect(t.toString()).toBe('11:1:10');
  });

  it('should have a validity flag', () => {
    expect(new NgbTime(11, 0, 30).isValid()).toBeTruthy();
    expect(new NgbTime(<any>null, 0, 30).isValid()).toBeFalsy();
    expect(new NgbTime(11, <any>null, 30).isValid()).toBeFalsy();
    expect(new NgbTime(11, 0, <any>null).isValid()).toBeFalsy();
    expect(new NgbTime(<any>null, 0, <any>null).isValid()).toBeFalsy();
    expect(new NgbTime(<any>null, <any>null, <any>null).isValid()).toBeFalsy();
  });

  it('should have a validity flag with optional seconds checking',
     () => { expect(new NgbTime(11, 0).isValid(false)).toBeTruthy(); });
});
