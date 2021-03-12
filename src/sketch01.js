import * as t from "three"
import * as Util from "./lib/Util";


export const main = () => {

    const rnd = new t.WebGLRenderer()
    rnd.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( rnd.domElement )

    const cam = new t.PerspectiveCamera( 45, Util.aspectRatio(), 1, 500 )
    cam.position.set( 0, 0, 100 )
    cam.lookAt( 0, 0, 0 )

    const scene = new t.Scene()

    const mat = new t.LineBasicMaterial( { color: 0xff00ff } )

    const pnts = [
        new t.Vector3( -10, 0, 0 ),
        new t.Vector3( 0, 10, 0 ),
        new t.Vector3( 10, 0, 0 )
    ]

    const geo = new t.BufferGeometry().setFromPoints( pnts )

    const line = new t.Line( geo, mat )

    const obj = new t.Object3D()

    scene.add( line )
    scene.add( obj )

    rnd.render( scene, cam )
}
