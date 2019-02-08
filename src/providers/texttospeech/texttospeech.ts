import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Injectable()
export class TexttospeechProvider {
  constructor(public tts: TextToSpeech) {}

  speak(msg: string) {
    const options = {
      text: msg,
      rate: 1
    };

    this.tts
      .speak(options)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }
}
