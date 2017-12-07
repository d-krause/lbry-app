import * as settings from "constants/settings";
import { createSelector } from "reselect";
import { selectAllClaimsByChannel, selectClaimsById } from "./claims";

const _selectState = state => state.subscriptions || {};

// list of saved channel names and uris
export const selectSubscriptions = createSelector(
  _selectState,
  state => state.subscriptions
);

export const selectSubscriptionsFromClaims = createSelector(
  selectAllClaimsByChannel,
  selectClaimsById,
  selectSubscriptions,
  (channelIds, allClaims, subscriptions) => {
    // no subscriptions loaded yet
    if (!Object.keys(channelIds).length) {
      return [];
    }

    let fetchedSubscriptions = [];

    subscriptions.forEach(subscription => {
      let channelClaims = [];

      if (channelIds[subscription.uri]) {
        // This will need to be more robust, we will want to be able to load more than the first page
        const pageOneChannelIds = channelIds[subscription.uri]["1"];

        // we have the channel ids and the corresponding claims
        // loop over the list of ids and grab the claim
        pageOneChannelIds.forEach(id => {
          const grabbedClaim = allClaims[id];
          channelClaims.push(grabbedClaim);
        });
      } else {
        // I think right here means a channel doesn't have any content
      }

      if (!!channelClaims.length) {
        fetchedSubscriptions.push({
          claims: channelClaims,
          channelName: subscription.channelName,
          uri: subscription.uri,
        });
      }
    });

    return fetchedSubscriptions;
  }
);
