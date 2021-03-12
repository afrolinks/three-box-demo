import * as t from "three"
import * as Util from "./Util";
import { TimelineMax } from "gsap";

export const createScene = () =>
    new t.Scene();

export const createRenderer = ( opts ) => {
    const rnd = new t.WebGLRenderer( { antialias: true } )
    rnd.setClearColor( 0xDEDEDE )
    rnd.setSize( window.innerWidth, window.innerHeight )
    return rnd
}

export const createCamera = ctx => {
    const cam = new t.PerspectiveCamera(
        75, //fov
        Util.aspectRatio( ctx ),
        0.1, //near plane
        1000, //far plane
    )

    cam.position.z = 10

    return cam
}

export const createLights = () => {
    const pl0 = new t.PointLight( 0xFFFFFF, 1, 500 )
    pl0.position.set( 10, 0, 25 )

    const pl1 = new t.PointLight( 0xCCCCCC, 2, 100 )
    pl1.position.set( 0, 0, 50 )

    return {
        pl0,
        pl1,
    }
}

export const createMeshes = count => {
    const geo = new t.BoxGeometry( 1, 1, 1 )
    const mat = new t.MeshLambertMaterial( { color: 0xDEDEDE } )

    const objs = []
    for (let i = 0; i < count; i++) {
        const mesh = new t.Mesh( geo, mat )
        mesh.position.x = (Math.random() - .5) * 10
        mesh.position.y = (Math.random() - .5) * 10
        mesh.position.z = (Math.random() - .5) * 10
        objs.push( mesh )
    }

    return objs
}


export const createBoxTween = box => {
    const tl = new TimelineMax( { paused: true } ).delay( 0.3 )
    tl.to( box.scale, 1, { x: 2 } )
    tl.to( box.scale, .5, { x: .5 } )
    tl.to( box.position, .5, { x: 2 } )
    tl.to( box.rotation, .5, { y: Math.PI / 2 } )
    return tl
}