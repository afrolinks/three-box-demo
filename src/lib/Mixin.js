import * as Util from "./Util";

export const WindowResize = ( ctx, renderer, camera ) => {

    const onWindowResize = e => {
        renderer.setSize( Util.width(ctx), Util.height(ctx) )
        camera.aspect = Util.aspectRatio( ctx )
        camera.updateProjectionMatrix()
    }

    ctx.addEventListener( "resize", onWindowResize )
}

export const Animate = callback => {

    let startedAt

    const onAnimationFrame = timestamp => {
        startedAt = startedAt === undefined ? timestamp : startedAt

        const elapsed = timestamp - startedAt

        callback( elapsed )

        requestAnimationFrame( onAnimationFrame )
    }

    requestAnimationFrame( onAnimationFrame )

}