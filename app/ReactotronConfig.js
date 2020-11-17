import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage'
// console.log("====Reactotron====",Reactotron);
if (__DEV__) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    const scriptHostname = scriptURL.split('://')[1].split(':')[0];
    Reactotron
        .configure({ host: scriptHostname })
        .useReactNative()
        .setAsyncStorageHandler(AsyncStorage) 
        .use(reactotronRedux())
        .connect();
    // Running on android device
    // $ adb reverse tcp:9090 tcp:9090
    Reactotron.clear();
    console.warn = Reactotron.log;
    console.log = Reactotron.log;
    console.disableYellowBox = true;
}
