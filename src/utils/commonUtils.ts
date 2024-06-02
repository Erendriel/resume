interface Screen {
  screen_name: string;
  alreadyRendered?: boolean;
}

export const TOTAL_SCREENS: Screen[] = [
  {
    screen_name: "AboutMe",
    alreadyRendered: false,
  },
  {
    screen_name: "Resume",
    alreadyRendered: false,
  },
  {
    screen_name: "Testimonial",
    alreadyRendered: false,
  },
  {
    screen_name: "ContactMe",
    alreadyRendered: false,
  },
];

export const GET_SCREEN_INDEX = (screen_name: string) => {
  if (!screen_name) return -1;

  for (let i = 0; i < TOTAL_SCREENS.length; i++) {
    if (TOTAL_SCREENS[i].screen_name === screen_name) return i;
  }

  return -1;
};
