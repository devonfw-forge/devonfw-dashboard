import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';

import Grid from '@material-ui/core/Grid';
import WelcomeSnippet from '../welcome-snippet/welcome-snippet';

import { ProfileData } from '../../../../models/dashboard/profile-data';
import DownloadButton from '../../../shared/components/download-button/download-button';
import DownloadDevonfw from '../download-devonfw/download-devonfw';

const DASHBOARD_DOWNLOAD_URL =
  'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

export default function WelcomeToDevonfw(): JSX.Element {
  const [avatar, setAvatar] = useState('male.svg');

  useEffect(() => {
    global.ipcRenderer.send('find:profile');

    global.ipcRenderer.on(
      'get:profile',
      (_: IpcRendererEvent, data: ProfileData) => {
        if (data.gender !== '') {
          const avatarImg = data.gender + '.svg';
          setAvatar(avatarImg);
        }
      }
    );

    return () => {
      global.ipcRenderer.removeAllListeners('get:profile');
    };
  });

  return (
    <Grid container spacing={3} style={{ fontSize: '16px' }}>
      <Grid item xs={12}>
        <img src={'/static/assets/' + avatar} alt="admin" />
      </Grid>
      <Grid item xs={12} md={7}>
        <>
          <WelcomeSnippet></WelcomeSnippet>
          {/* <DownloadButton href={DASHBOARD_DOWNLOAD_URL}>
            Download latest version
          </DownloadButton> */}
          <DownloadDevonfw></DownloadDevonfw>
        </>
      </Grid>
    </Grid>
  );
}
