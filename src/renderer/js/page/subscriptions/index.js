import React from "react";
import { connect } from "react-redux";
import {
  selectSubscriptionsFromClaims,
  selectSubscriptions,
} from "redux/selectors/subscriptions";
import { doFetchClaimsByChannel } from "redux/actions/content";
import SubscriptionsPage from "./view";

const select = state => ({
  savedSubscriptions: selectSubscriptions(state),
  subscriptions: selectSubscriptionsFromClaims(state),
});

export default connect(select, {
  doFetchClaimsByChannel,
})(SubscriptionsPage);
