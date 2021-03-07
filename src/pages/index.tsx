import React from 'react';
import { Row, Col, Button } from 'antd';
import localforage from 'localforage';
import { BODY_CLASSES, BODY_THEME_DEFAULT } from '@/utils/commonConstantValues';
import styles from './index.less';

const Demo: React.FC = () => {
  const changeTheme = async () => {
    try {
      const originBodyClass = (await localforage.getItem('bodyClass')) || BODY_THEME_DEFAULT;
      const originClassIndex = BODY_CLASSES.findIndex((el) => el === originBodyClass);
      let bodyClassIndex = originClassIndex === BODY_CLASSES.length - 1 ? 0 : originClassIndex + 1;
      let body: HTMLElement = document.getElementsByTagName('body')[0];
      const bodyClass: string = BODY_CLASSES[bodyClassIndex];
      body.className = bodyClass;
      await localforage.setItem('bodyClass', bodyClass);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.pageWrapper}>
      <Row>
        <Col span={24}>
          <div className={styles.topNav}>Top Navigation</div>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 4, order: 1 }}
          lg={{ span: 4, order: 1 }}
        >
          <Row>
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 12, order: 2 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 24, order: 1 }}
            >
              <div className={styles.leftFirst}>Left First Part</div>
            </Col>
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 12, order: 2 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 24, order: 1 }}
            >
              <div className={styles.leftSecond}>Left Second Part</div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 16, order: 2 }}
          lg={{ span: 16, order: 2 }}
        >
          <div className={styles.main}>Main Part</div>
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          md={{ span: 4, order: 3 }}
          lg={{ span: 4, order: 3 }}
        >
          <div className={styles.right}>Right Part</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.bottom}>
            <div className={styles.buttonWrapper}>
              <Button onClick={changeTheme}>Click Here To Change Theme</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Demo;
