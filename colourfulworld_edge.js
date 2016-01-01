/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "5.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.0.375",
                scaleToFit: "width",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: '_12',
                            type: 'image',
                            rect: ['-104px', '-825px', '2334px', '2359px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"1.jpg",'0px','0px']
                        },
                        {
                            id: '_1',
                            type: 'image',
                            rect: ['-1220px', '-44px', '4292px', '4292px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"1.svg",'0px','0px']
                        },
                        {
                            id: 'spatechofin12312',
                            type: 'image',
                            rect: ['617px', '155px', '686px', '686px', 'auto', 'auto'],
                            opacity: 0,
                            fill: ["rgba(0,0,0,0)",im+"spatechofin1231.png",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1920px', '1080px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 8000,
                    autoPlay: true,
                    data: [
                        [
                            "eid3",
                            "rotateZ",
                            0,
                            5000,
                            "easeInOutBounce",
                            "${_1}",
                            '0deg',
                            '360deg'
                        ],
                        [
                            "eid4",
                            "rotateZ",
                            5000,
                            3000,
                            "easeInOutCubic",
                            "${_1}",
                            '360deg',
                            '720deg'
                        ],
                        [
                            "eid22",
                            "top",
                            8000,
                            0,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '155px',
                            '155px'
                        ],
                        [
                            "eid20",
                            "width",
                            8000,
                            0,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '686px',
                            '686px'
                        ],
                        [
                            "eid11",
                            "opacity",
                            0,
                            0,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '0',
                            '0'
                        ],
                        [
                            "eid13",
                            "opacity",
                            5000,
                            2003,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '0.000000',
                            '1'
                        ],
                        [
                            "eid17",
                            "height",
                            8000,
                            0,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '686px',
                            '686px'
                        ],
                        [
                            "eid21",
                            "left",
                            8000,
                            0,
                            "easeInOutCubic",
                            "${spatechofin12312}",
                            '617px',
                            '617px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("colourfulworld_edgeActions.js");
})("EDGE-1962980");
