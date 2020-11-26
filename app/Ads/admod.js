// import { updateGold } from '../../store/user'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import admob ,{MaxAdContentRating, InterstitialAd, RewardedAd, RewardedAdEventType, TestIds, AdEventType } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1626321943018250~1658020858';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const Admob = props => {
    useEffect(() => {
        admob()
            .setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,
            })
            .then(() => {
                // Request config successfully set!
                console.log("Request config successfully set!")
            });


        const eventListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show()
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of ', reward);
            }
        });

        // Start loading the rewarded ad straight away
        rewarded.load();
        console.log("heel")
        showRewardAd()
        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };

       
    }, []);

    const showRewardAd = () => {
        console.log('ahksfhdsfsdhfkds')
        rewarded.onAdEvent((type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show();
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of 5 lives');
                goHome(2)
            }
        });
        rewarded.load();
    }
    return(
        showRewardAd()
    )
}
export default Admob