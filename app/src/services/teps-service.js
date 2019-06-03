/* Services */

/**
*  Service that compiles the information about Target Enabling Packages (TEPs)
*  More info of this packages: http://www.thesgc.org/tep
*  This information is static and needs to be updated when new TEPs are made available
* */
angular.module('otServices')

    .factory('otTeps', [function () {
        'use strict';

        return {
            ENSG00000094631: {
                id: 'ENSG00000094631',
                symbol: 'HDAC6'
            },
            ENSG00000120733: {
                id: 'ENSG00000120733',
                symbol: 'KDM3B'
            },
            ENSG00000186280: {
                id: 'ENSG00000186280',
                symbol: 'KDM4D'
            },
            ENSG00000146247: {
                id: 'ENSG00000146247',
                symbol: 'PHIP'
            },
            ENSG00000108469: {
                id: 'ENSG00000108469',
                symbol: 'RECQL5'
            },
            ENSG00000143379: {
                id: 'ENSG00000143379',
                symbol: 'SETDB1'
            },
            ENSG00000167258: {
                id: 'ENSG00000167258',
                symbol: 'CDK12'
            },
            ENSG00000106683: {
                id: 'ENSG00000106683',
                symbol: 'LIMK1'
            },
            ENSG00000198924: {
                id: 'ENSG00000198924',
                symbol: 'DCLRE1A'
            },
            ENSG00000172269: {
                id: 'ENSG00000172269',
                symbol: 'DPAGT1'
            },
            ENSG00000008311: {
                id: 'ENSG00000008311',
                symbol: 'AASS'
            },
            ENSG00000196632: {
                id: 'ENSG00000196632',
                symbol: 'WNK3'
            },
            ENSG00000104312: {
                id: 'ENSG00000104312',
                symbol: 'RIPK2'
            },
            ENSG00000101323: {
                id: 'ENSG00000101323',
                symbol: 'HAO1'
            },
            ENSG00000168143: {
                id: 'ENSG00000168143',
                symbol: 'FAM83B'
            },
            ENSG00000173193: {
                id: 'ENSG00000173193',
                symbol: 'PARP14'
            },
            ENSG00000140876: {
                id: 'ENSG00000140876',
                symbol: 'NUDT7'
            },
            ENSG00000138622: {
                id: 'ENSG00000138622',
                symbol: 'HCN4'
            },
            ENSG00000130382: {
                id: 'ENSG00000130382',
                symbol: 'MLLT1'
            },
            ENSG00000213930: {
                id: 'ENSG00000213930',
                symbol: 'GALT'
            },
            ENSG00000108479: {
                id: 'ENSG00000108479',
                symbol: 'GALK1'
            }
        };
    }]);
