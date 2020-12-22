// utils.js

export default {
    wait: ms => new Promise(resolve => setTimeout(resolve, ms)),
    syncOperation: function (op) {
        if (op && op.steps) {
            let stepIdx = 0;
            clearTimeout(op.controller);
            function play() {
                if (stepIdx < op.steps.length) {
                    op.steps[stepIdx].func();
                    op.controller = setTimeout(play, op.steps[stepIdx++].playtime);
                }
            }
            play();
        }
    }
}