((win) => {
    const {
        requestAnimationFrame,
        cancelAnimationFrame
    } = win;

    const frameWorker = new class FrameWorker {
        constructor () {
            this.frameIds = new Set();
            this.frameId = null;
        }

        work () {
            if (this.frameIds.size === 0) {
                cancelAnimationFrame(this.frameId);
                this.frameId = null;
            } else {
                for (const callback of this.frameIds) {
                    callback();
                }

                this.frameId ??= requestAnimationFrame(this.work.bind(this));
            }
        }

        request (callback) {
            if (this.frameIds.has(callback)) return

            this.frameIds.add(callback);

            if (this.frameIds.size === 1) {
                this.work();
            }

            return callback
        }

        cancel (callback) {
            if (!this.frameIds.has(callback)) return

            this.frameIds.delete(callback);

            if (this.frameIds.size === 0) {
                this.work();
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
