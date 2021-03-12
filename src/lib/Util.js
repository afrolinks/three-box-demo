import { map } from "ramda"

export const aspectRatio = ctx =>
    width( ctx ) / height( ctx )

export const width = ctx =>
    ctx.innerWidth

export const height = ctx =>
    ctx.innerHeight

export const appendRenderer = ( ctx, renderer ) =>
    ctx.document.body.appendChild( renderer.domElement )

export const addLights = scene => lights => {
    if ( Array.isArray( lights ) ) {
        lights.map( light => {scene.add( light )} )
    } else if ( typeof lights === "object" ) {
        Object.keys( lights ).map( k => {scene.add( lights[k] )} )
    }
}

export const addMeshes = scene => meshes => {
    if ( Array.isArray( meshes ) ) {
        meshes.map( mesh => {scene.add( mesh )} )
    } else if ( typeof meshes === "object" ) {
        Object.keys( meshes ).map( k => {scene.add( meshes[k] )} )
    }
}

export const addEvent = name => callback =>
    window.document.addEventListener(name, callback)