import { REPO_URL } from '../constants';

export function Footer() {
  return (
    <footer className='footer'>
      v{__APP_VERSION__} (
      <a
        href={`${REPO_URL}/commit/${__COMMIT_SHA__}`}
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        {__COMMIT_SHA__}
      </a>
      ) · {__BUILD_DATE__} {__BUILD_TIME__} UTC
    </footer>
  );
}
