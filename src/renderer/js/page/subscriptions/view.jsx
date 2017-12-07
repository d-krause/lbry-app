import React from "react";
import SubHeader from "component/subHeader";
import { BusyMessage } from "component/common.js";
import { FeaturedCategory } from "page/discover/view";

type Props = {
  // fetchClaims: (string, number) => void,
  // subscriptions:
};

export default class extends React.PureComponent<Props> {
  componentDidMount() {
    const { doFetchClaimsByChannel, savedSubscriptions } = this.props;
    if (savedSubscriptions.length) {
      // this should use batchActions
      savedSubscriptions.forEach(sub => {
        doFetchClaimsByChannel(sub.uri, 1);
      });
    }
  }

  render() {
    const { subscriptions, savedSubscriptions } = this.props;
    const fetchingSubscriptions =
      !!savedSubscriptions.length &&
      subscriptions.length !== savedSubscriptions.length;

    // Come back to me
    // need to deal with channels that don't have any content
    // you should still see the channel in your subscriptions

    return (
      <main className="main main--no-margin">
        <SubHeader modifier="full-width" />
        {fetchingSubscriptions && (
          <BusyMessage message={__("Fetching content")} />
        )}
        {!savedSubscriptions.length && (
          <div>{__("You haven't subscribed to any channels yet")}</div>
        )}
        {!!savedSubscriptions.length && (
          <div>
            {!!subscriptions.length &&
              subscriptions.map(subscription => {
                // creating uris for each subscription file
                const names = subscription.claims.slice().map(claim => {
                  return `${claim.name}#${claim.claim_id}`;
                });

                return (
                  <FeaturedCategory
                    key={subscription.channelName}
                    categoryLink={`lbry://${subscription.uri}`}
                    category={subscription.channelName}
                    names={names}
                  />
                );
              })}
          </div>
        )}
      </main>
    );
  }
}
