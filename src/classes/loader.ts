import { Container } from './container';
import { Constants } from '../utils/constants';
import { IOptions } from '../utils/interfaces';

'use strict';

let tsParticlesDom: Container[] = [];

export class Loader {
  public static dom() {
    if (!tsParticlesDom) {
      Loader.domSet([]);
    }

    return tsParticlesDom;
  }

  public static domSet(value: Container[]) {
    tsParticlesDom = value;
  }

  public static load(tag_id: string, params: IOptions) {
    /* elements */
    let tag = document.getElementById(tag_id);

    if (!tag) {
      return;
    }

    let exist_canvas = tag.getElementsByClassName(Constants.canvasClass);

    /* remove canvas if exists into the pJS target tag */
    if (exist_canvas.length) {
      while (exist_canvas.length > 0) {
        tag.removeChild(exist_canvas[0]);
      }
    }

    /* create canvas element */
    let canvas_el = document.createElement('canvas');

    canvas_el.className = Constants.canvasClass;

    /* set size canvas */
    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";

    /* append canvas */
    const canvas = document.getElementById(tag_id)?.appendChild(canvas_el);

    /* launch tsparticle */
    if (!canvas) return;

    const newItem = new Container(tag_id, params);
    const dom = Loader.dom();
    const idx = dom.findIndex(v => v.canvas.tag_id == tag_id);

    if (idx >= 0) {
      dom.splice(idx, 1, newItem);
    } else {
      dom.push(newItem);
    }

    return newItem;
  }

  public static async loadJSON(tag_id: string, path_config_json: string) {
    /* load json config */
    const response = await fetch(path_config_json);

    if (response.ok) {
      const params = await response.json();

      Loader.load(tag_id, params);
    } else {
      console.error(`Error pJS - fetch status: ${response.status}`);
      console.error('Error pJS - File config not found');
    }
  };

  public static setOnClickHandler(callback: EventListenerOrEventListenerObject) {
    let tsParticlesDom = Loader.dom();

    if (tsParticlesDom.length == 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }

    for (const domItem of tsParticlesDom) {
      let el = domItem.interactivity.el;

      if (el) {
        el.addEventListener('click', callback);
      }
    }
  }
};