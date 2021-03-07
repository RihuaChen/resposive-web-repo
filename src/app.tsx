import localforage from 'localforage';
import { BODY_THEME_DEFAULT } from '@/utils/commonConstantValues';

export async function onRouteChange() {
  const bodyClass: string | null = await localforage.getItem('bodyClass');
  let body: HTMLElement = document.getElementsByTagName('body')[0];
  if (!body.className) {
    body.className = bodyClass ?? BODY_THEME_DEFAULT;
  }
}
