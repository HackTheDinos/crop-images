## Installation

1. You will need to have [nodejs](https://nodejs.org/en/) installed
2. Clone the repository
  * `git clone git@github.com:HackTheDinos/crop-images.git`
3. Change directory into the repository
  * `cd crop-images`
4. Install the node modules
  * `npm install`

## Usage

1. Start the server `npm start`
2. Upload an image with crop information:

```sh
curl -F "image=@example/image/kitten.jpg" -F 'parts=[{"width": 315, "height": 250, "x": 591, "y": 217}]' 'http://localhost:3000/crop'
```
