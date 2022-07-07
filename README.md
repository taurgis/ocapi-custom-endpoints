# sfcc-hooks-collection

This repository contains common or complex ocapi hooks required to run headless projects with commerce cloud b2c. It is meant as guideline and sample code, but not to use as is.
Always ensure to pick only the hooks your customer needs and double check shopper data is secure against the customers requirements. Also double check https://developer.commercecloud.com/ might provide alternative APIs to this list

## Features
* Guest Order Look Up
* Server-To-Server Payments
* Multiple Payments
* Customer Groups API
* Promotion enabled Product Extend (useful with headless shopper product search)
* Promotion enabled search  
* Password reset with emails sent via b2c commerce
* Page Designer Serialization
* CacheKey API
* Search Suggest API
* Send Mail API
* URL Resolution API

## When to use APIs
### CacheKey API
The cache key api (integration test 08) provides a way to get a cache key to a jwt. 
This is useful to call after events like login to get the new personalized segmentation of the user. For instance all users of group "employee" will get the same hash, so the headless middleware can cache promotion enabled search by user url and the result of this API as key

You can also call it frequently from the frontend (i.e. every 60 seconds) as the cache key changes after cache clearing replication. So in case new prices were published on the b2c commerce server, the cache key will change. Note: unlike storefront we use static cache to detemerine a change

## Quick Setup
* fill out `dw.json` with at least username, client-id and hostname of your sandbox
* run `npm run build:build-environment` to replace siteimport and other configs with data of your dw.json
* run `npm run all` to install it on your sandbox
* run `npm run test:integration` to see it in action

## Guest order lookup
For guest order lookup to work, you user needs to be setup correctly. We suggest to use BM Access Keys
* Open Business Manager of your sandbox
* Click on user on top right on your profile name
* Click `Manage Access Keys`
* Click `Generate Access Key` and select `Agent User Login and OCAPI`
* Copy this value as `ocapi-access-key` into `dw.json`
* Ensure `dw.json` contains `client-secret`
* run `npm run build:build-environment`

### Sample dw.json ###
```json
{
    "client-id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "client-secret": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "username": "user",
    "password": "password",
    "ocapi-access-key": "ocapi_access_key_or_biz_mngr_password",
    "hostname": "<dev-sandbox>.dx.commercecloud.salesforce.com"
}
```

Note the guest order lookup requires your Business Manager password or access key ("Agent User Login and OCAPI") in Administration -> Operations -> Services -> Credentials -> ocapi.auth.cred. Please enter this manually via Business Manager or in your dw.json file as `ocapi-access-key`

## API Usage
While no swagger is available, please refer to the integration tests to learn about the APIs

## License
Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)
