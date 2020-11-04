const ADS_TESTING_ID = 'ca-app-pub-3940256099942544/5224354917'

import React, { Component, useEffect, useState } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  // BackHandler,
} from 'react-native';
import {
  // AdMobBanner,
  // AdMobInterstitial,
  AdMobRewarded,
  // PublisherBanner,
} from 'react-native-admob';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAppState, useBackHandler } from '@react-native-community/hooks'
import RNExitApp from 'react-native-exit-app';

const BannerTimeSlide = ({ style, title, children, ...props }) => (
  <View {...props} style={[styles.TimeSlide, style]}>
    <Text style={styles.title}>{title}</Text>
    <View>{children}</View>
  </View>
);

export default function Advertisement(props) {

  const [loading, setLoading] = useState(true)
  const currentAppState = useAppState()
  console.log("currentAppState", currentAppState);

  useEffect(() => {
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID(ADS_TESTING_ID);

    AdMobRewarded.addEventListener('rewarded', reward =>
      console.log('AdMobRewarded => rewarded', reward),
    );
    AdMobRewarded.addEventListener('adLoaded', () => {
      console.log('AdMobRewarded => adLoaded'),
      showRewarded();
    });
    AdMobRewarded.addEventListener('adFailedToLoad', error =>
      console.warn(error),
    );
    AdMobRewarded.addEventListener('adOpened', () =>
      console.log('AdMobRewarded => adOpened'),
    );
    AdMobRewarded.addEventListener('videoStarted', () => {
      console.log('AdMobRewarded => videoStarted')
      setLoading(false);
    });
    AdMobRewarded.addEventListener('adClosed', () => {
      console.log('AdMobRewarded => adClosed');
      // BackHandler.exitApp();
      
      RNExitApp.exitApp();
      //AdMobRewarded.requestAd().catch(error => console.warn(error));
    });
    AdMobRewarded.addEventListener('adLeftApplication', () =>
      console.log('AdMobRewarded => adLeftApplication'),
    );

    AdMobRewarded.requestAd().catch(error => console.warn(error));

    return () => {
      AdMobRewarded.removeAllListeners();
    };
  }, [])


  const showRewarded = () => {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  return (
      <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
{      /* <ScrollView>
        <BannerTimeSlide title="Rewarded">
          <Button
            title="Show Rewarded Video and preload next"
            onPress={this.showRewarded}
          />
        </BannerTimeSlide>
      </ScrollView> */}
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  TimeSlide: {
    paddingVertical: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});