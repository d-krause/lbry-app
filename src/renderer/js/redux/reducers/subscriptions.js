import * as actions from "constants/action_types";
import { handleActions } from "util/redux-utils";

type SubscriptionState = {
  subscriptions: Array<Subscription>,
};

export type Subscription = {
  channelName: string,
};

export type ChannelSubscribe = {
  type: actions.CHANNEL_SUBSCRIBE,
  data: Subscription,
};
export type ChannelUnsubscribe = {
  type: actions.CHANNEL_UNSUBSCRIBE,
  data: Subscription,
};

const defaultState = {
  subscriptions: [],
};

export default handleActions(
  {
    [actions.CHANNEL_SUBSCRIBE]: (
      state: SubscriptionState,
      action: ChannelSubscribe
    ): SubscriptionState => {
      const newSubscription: Subscription = action.data;
      let newSubscriptions = state.subscriptions.slice();
      newSubscriptions.unshift(newSubscription);

      return {
        ...state,
        subscriptions: newSubscriptions,
      };
    },
    [actions.CHANNEL_UNSUBSCRIBE]: (
      state: SubscriptionState,
      action: ChannelUnsubscribe
    ): SubscriptionState => {
      const subscriptionToRemove: Subscription = action.data;

      const newSubscriptions = state.subscriptions
        .slice()
        .filter(subscription => {
          return subscription.channelName !== subscriptionToRemove.channelName;
        });

      return {
        ...state,
        subscriptions: newSubscriptions,
      };
    },
  },
  defaultState
);
