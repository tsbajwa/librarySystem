/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example at end of file:
 * Updated version with better ui, as compared to original tinyTest.
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */

var TinyTestHelper = {
    renderstats: function(tests, failures) {
        var totalTests = Object.keys(tests).length;
        var success = totalTests - failures;
        var summaryCounter = 'Ran ' + totalTests + ' tests: '
                                + success + ' successes '
                                + failures + ' failures'; 
        
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryCounter;
        document.body.appendChild(summaryElement);
    }
};

var TinyTest = {

    run: function(tests) {
        var failures = 0;
        for (var testName in tests) {    //testName = property name, ie method name
            var testAction = tests[testName]; // actual function under each property
            try {
                testAction.apply(this);        
                console.log("%c Test: %s PASS", 'color: green', testName);
            } catch (e) {
                failures++;
                console.groupCollapsed("%c Test: %s FAILED", 'color: red', testName);
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {     
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderstats(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);


 /*Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.*/