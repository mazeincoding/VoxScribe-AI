class RecorderProcessor extends AudioWorkletProcessor {
  private _buffer: Float32Array[] = [];

  constructor() {
    super();
    this.port.onmessage = (event) => {
      if (event.data === "flush") {
        this.flush();
      }
    };
  }

  process(inputs: Float32Array[][]) {
    const input = inputs[0];
    if (input.length > 0) {
      this._buffer.push(input[0].slice());
    }
    return true;
  }

  flush() {
    const buffer = this._buffer.reduce((acc, cur) => {
      acc.set(cur, acc.length);
      return acc;
    }, new Float32Array(this._buffer.length * 128));
    this.port.postMessage(buffer);
    this._buffer = [];
  }
}

registerProcessor("recorder-processor", RecorderProcessor);
