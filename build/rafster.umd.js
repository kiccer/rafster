(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    ((win) => {
        const {
            requestAnimationFrame
            // cancelAnimationFrame
        } = win;

        const frameWorker = new class FrameWorker {
            constructor () {
                // Increase id, avoid duplicate id.
                this.increaseId = 0;
                // Store the callback function.
                this.frameIds = new Map();
            }

            work () {
                // When there is no task, no longer execute, saving performance.
                if (this.frameIds.size === 0) return

                for (const [id, callback] of [...this.frameIds]) {
                    // Execute asynchronously to avoid blocking.
                    const timer = setTimeout(() => {
                        callback(performance.now());
                        // Prevent memory overflow.
                        clearTimeout(timer);
                    });
                    this.frameIds.delete(id);
                }

                // console.log('==================================')

                requestAnimationFrame(this.work.bind(this));
            }

            request (callback) {
                const id = this.increaseId++;
                this.frameIds.set(id, callback);
                if (this.frameIds.size === 1) this.work();
                return id
            }

            cancel (id) {
                if (this.frameIds.has(id)) {
                    this.frameIds.delete(id);
                }
            }
        }();

        win.requestAnimationFrame = function (callback) {
            return frameWorker.request(callback)
        };

        win.cancelAnimationFrame = function (id) {
            frameWorker.cancel(id);
        };
    })(globalThis || window);

}));
