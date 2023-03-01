define((function () { 'use strict';

    ((win) => {
        const {
            requestAnimationFrame,
            cancelAnimationFrame
        } = win;

        const frameWorker = new class FrameWorker {
            constructor () {
                this.increaseId = 0;
                this.frameIds = new Map();
                this.work();
            }

            work () {
                for (const [id, callback] of [...this.frameIds]) {
                    callback();
                    this.frameIds.delete(id);
                }

                requestAnimationFrame(this.work.bind(this));
            }

            request (callback) {
                const id = this.increaseId++;
                this.frameIds.set(id, callback);
                return id
            }

            cancel (id) {
                if (this.frameIds.has(id)) {
                    this.frameIds.delete(id);
                }
            }
        };

        win.requestAnimationFrame = function (callback) {
            return frameWorker.request(callback)
        };

        win.cancelAnimationFrame = function (id) {
            frameWorker.cancel(id);
        };
    })(globalThis);

}));
