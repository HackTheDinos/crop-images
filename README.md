## Installation

1. You will need to have [nodejs](https://nodejs.org/en/) installed
2. You also need to have [GraphicsMagick](http://www.graphicsmagick.org/) installed
3. Clone the repository
  * `git clone git@github.com:HackTheDinos/crop-images.git`
4. Change directory into the repository
  * `cd crop-images`
5. Install the node modules
  * `npm install`

## Usage

1. Start the server `npm start`
2. Upload an image with crop information:

```sh
curl -F "image=@example/image/kitten.jpg" -F 'parts=[{"width": 315, "height": 250, "x": 591, "y": 217}]' 'http://localhost:3000/crop'
```

The cropped image can be found in the `cropped/` folder.
