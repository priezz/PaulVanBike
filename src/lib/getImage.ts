import images from '../lib/images'

export default function getImage(image: string): any {
    if(!image) return null
    const idx: number = image.indexOf("http://") + image.indexOf("https://")
    if(idx > -2) console.log({uri: image})
    if(idx === -2) console.log(image)
    else console.log(images[image])
    if(idx > -2) return {uri: image}
    else return images[image]
}
