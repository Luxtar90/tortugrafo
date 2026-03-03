declare module "simple-parallax-js/vanilla" {
  type ParallaxOptions = {
    scale?: number;
    delay?: number;
    transition?: string;
    maxTransition?: number;
  };

  export default class SimpleParallax {
    constructor(
      element: HTMLImageElement | HTMLImageElement[],
      options?: ParallaxOptions
    );
    destroy(): void;
  }
}
