class RecorderProcessor extends AudioWorkletProcessor {
  private _buffer: Float32Array[] = [];

  constructor() {
    super();
    this.port.onmessage = (event) => {
      if (event.data === 'flush') {
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
    const bufferLength = this._buffer.reduce((acc, cur) => acc + cur.length, 0);
    const buffer = new Float32Array(bufferLength);
    let offset = 0;
    for (const chunk of this._buffer) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }
    this.port.postMessage(buffer);
    this._buffer = [];
  }
}

registerProcessor('recorder-processor', RecorderProcessor);
