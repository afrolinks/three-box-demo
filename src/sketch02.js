import * as t from "three"
import * as Util from "./lib/Util"
import * as Factory from "./lib/Factory"
import { aspectRatio, width } from "./lib/Util";
import * as Mixin from "./lib/Mixin"
import { TimelineMax, Expo } from "gsap"


export const createSketch = ( ctx ) => { //expect a window context
    //setup
    const app = {}
    app.ctx = ctx
    app.scene = Factory.createScene()
    app.cam = Factory.createCamera( ctx )
    app.rnd = Factory.createRenderer( { background: 0xE5E5E5 } )
    app.raycaster = new t.Raycaster()

    const state = {}
    state.ctx = ctx
    state.foo = 'bar'
    state.mesh = Factory.createMeshes( 10 )
    state.light = Factory.createLights()

    //compose
    Util.addMeshes( app.scene )( state.mesh )
    Util.addLights( app.scene )( state.light )

    //wire
    Mixin.WindowResize( ctx, app.rnd, app.cam )
    Util.appendRenderer( ctx, app.rnd )
    Util.addEvent( "click" )( applyTweens( app )( state ) )


    //render
    app.rnd.render( app.scene, app.cam )
    const updateFn = update( app )( state )
    Mixin.Animate( updateFn )
}


const update = app => state => delta => {
    state.mesh[0].rotation.x += 0.01
    state.foo = Math.random()
    app.rnd.render( app.scene, app.cam )
}

const mouseEventVector = e => {
    const v = new t.Vector2()
    v.x = e.clientX / window.innerWidth * 2 - 1
    v.y = -1 * e.clientY / window.innerHeight * 2 + 1
    return v
}

const applyTweens = app => state => e => {
    e.preventDefault()
    app.raycaster
       .setFromCamera( mouseEventVector( e ), app.cam )
    app.raycaster
       .intersectObjects( app.scene.children, true )
       .map( applyTween )
}

export const applyTween = obj =>
    new TimelineMax()
        .delay( .02 )
        .to( obj.object.scale, .5, { x: 1, ease: Expo.easeOut } )
        .to( obj.object.scale, .25, { y: .5, ease: Expo.easeOut } )
        .to( obj.object.position, .25, { x: obj.object.position.x + 2, ease: Expo.easeOut } )
        .to( obj.object.rotation, .25, { y: Math.PI / 2, ease: Expo.easeOut }, "=-1.5" )
