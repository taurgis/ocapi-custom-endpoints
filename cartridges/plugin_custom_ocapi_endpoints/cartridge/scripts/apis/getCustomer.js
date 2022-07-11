'use strict';

/**
 * Fetch customer data using the Customer Number.
 *
 * WARNING: This is a very unsafe endpoint as you can fetch all accounts with an ID the is incremental! The idea is
 * just to show what is possible! And that with this possibility you can create serious security holes!
 *
 *  @param {Object} httpParams The query parameters passed to the request
 *
 *  @returns {Object} The result object to add to the API reponse
 */
exports.get = function (httpParams) {
    var System = require('dw/system/System');
    var result = {};

    // Put some protection in place in case someone does deploy this because of copy paste work!
    if ((System.getInstanceType() !== System.PRODUCTION_SYSTEM) &&
        (System.getInstanceType() !== System.STAGING_SYSTEM)) {
        if (!empty(httpParams.customer_no)) {
            var CustomerMgr = require('dw/customer/CustomerMgr');
            var customer = CustomerMgr.getCustomerByCustomerNumber(httpParams.customer_no.pop());

            if (customer) {
                result.first_name = customer.profile.firstName;
                result.last_name = customer.profile.lastName;
            } else {
                result.error = 'Customer not found';
                result.customer_no = httpParams.customer_no;
            }
        }
    }

    return result;
};
