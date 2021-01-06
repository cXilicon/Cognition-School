// utils.js

export default {
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

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

function range(startOrEnd, opt_end, opt_step) {
    let array = [];
    let start = 0;
    let end = startOrEnd;
    let step = opt_step || 1;
    if (opt_end !== undefined) {
        start = startOrEnd;
        end = opt_end;
    }

    if (step * (end - start) < 0) {
        // Sign mismatch: start + step will never reach the end value.
        return [];
    }

    if (step > 0) {
        for (let i = start; i < end; i += step) {
            array.push(i);
        }
    } else {
        for (let i = start; i > end; i += step) {
            array.push(i);
        }
    }
    return array;
}

export {shuffle, range}