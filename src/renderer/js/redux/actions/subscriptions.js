import * as actions from "constants/action_types";
import type {
  ChannelSubscribe,
  ChannelUnsubscribe,
  Subscription,
} from "redux/reducers/subscriptions";
import lbry from "lbry";

type Action = ChannelSubscribe | ChannelUnsubscribe;
type Dispatch = (action: Action) => any;

export const channelSubscribe = (subscription: Subscription) => (
  dispatch: Dispatch
) => {
  return dispatch({
    type: actions.CHANNEL_SUBSCRIBE,
    data: subscription,
  });
};

export const channelUnsubscribe = (subscription: Subscription) => (
  dispatch: Dispatch
) => {
  return dispatch({
    type: actions.CHANNEL_UNSUBSCRIBE,
    data: subscription,
  });
};

export function doFetchClaimsBySubscribedChannel(subscription, page) {
  const { channelName, uri } = subscription;

  return function(dispatch, getState) {
    dispatch({
      type: actions.FETCH_SUBSCRIBED_CHANNEL_CLAIMS_START,
      data: { uri, page },
    });

    lbry.claim_list_by_channel({ uri, page: page || 1 }).then(result => {
      const claimResult = result[uri] || {};
      const { claims_in_channel, returned_page } = claimResult;

      dispatch({
        type: actions.FETCH_SUBSCRIBED_CHANNEL_CLAIMS_COMPLETE,
        data: {
          channelName,
          uri,
          claims: claims_in_channel || [],
          page: returned_page || undefined,
        },
      });
    });
  };
}

export const subscriptionsLoaded = () => dispatch =>
  dispatch({ type: actions.SUBSCRIPTIONS_LOADED });
