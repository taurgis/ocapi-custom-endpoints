'use strict';

/**
 * Fetch customer data using the Customer Number.
 *
 * WARNING: This is a very unsafe endpoint as you can fetch all accounts with an ID the is incremental! The idea is
 * just to show what is possible!
 *
 */
exports.get = function (httpParams) {
    var result = {};

    if(!empty(httpParams.customer_no)) {
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var customer = CustomerMgr.getCustomerByCustomerNumber(httpParams.customer_no.pop());

        if(customer) {
            result.first_name = customer.profile.firstName;
            result.last_name = customer.profile.lastName;
        } else {
            result.error = 'Customer not found';
            result.customer_no = httpParams.customer_no;
        }
    }

    return result;
};
