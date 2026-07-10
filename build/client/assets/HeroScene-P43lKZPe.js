import{r as i,o as r}from"./chunk-KS7C4IRE-CGqfcxTo.js";import{b as ee,u as te,V as E,_ as je,D as We,c as K,P as he,d as Te,R as ze,S as ke,N as Ge,U as w,W as ce,H as we,e as ae,f as Oe,g as $e,B as He,h as ge,M as Ve,i as De,j as Le,k as Ne,l as ye,m as Me,n as qe,o as Ze,p as Xe,C as Je,E as Ke,L as ue,a as Qe,q as Ye,r as et}from"./mats-C99PurX6.js";import{C as tt,E as rt,B as st,T as nt,a as it,V as ot,S as at,R as _e}from"./Vignette-D-M9PHCn.js";import{c as lt}from"./client-CDBf0Cka.js";const re=new E,fe=new E,ut=new E,Se=new K;function ct(t,e,s){const o=re.setFromMatrixPosition(t.matrixWorld);o.project(e);const a=s.width/2,n=s.height/2;return[o.x*a+a,-(o.y*n)+n]}function mt(t,e){const s=re.setFromMatrixPosition(t.matrixWorld),o=fe.setFromMatrixPosition(e.matrixWorld),a=s.sub(o),n=e.getWorldDirection(ut);return a.angleTo(n)>Math.PI/2}function ht(t,e,s,o){const a=re.setFromMatrixPosition(t.matrixWorld),n=a.clone();n.project(e),Se.set(n.x,n.y),s.setFromCamera(Se,e);const h=s.intersectObjects(o,!0);if(h.length){const v=h[0].distance;return a.distanceTo(s.ray.origin)<v}return!0}function ft(t,e){if(e instanceof Te)return e.zoom;if(e instanceof he){const s=re.setFromMatrixPosition(t.matrixWorld),o=fe.setFromMatrixPosition(e.matrixWorld),a=e.fov*Math.PI/180,n=s.distanceTo(o);return 1/(2*Math.tan(a/2)*n)}else return 1}function dt(t,e,s){if(e instanceof he||e instanceof Te){const o=re.setFromMatrixPosition(t.matrixWorld),a=fe.setFromMatrixPosition(e.matrixWorld),n=o.distanceTo(a),h=(s[1]-s[0])/(e.far-e.near),v=s[1]-h*e.far;return Math.round(h*n+v)}}const me=t=>Math.abs(t)<1e-10?0:t;function Be(t,e,s=""){let o="matrix3d(";for(let a=0;a!==16;a++)o+=me(e[a]*t.elements[a])+(a!==15?",":")");return s+o}const pt=(t=>e=>Be(e,t))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),vt=(t=>(e,s)=>Be(e,t(s),"translate(-50%,-50%)"))(t=>[1/t,1/t,1/t,1,-1/t,-1/t,-1/t,-1,1/t,1/t,1/t,1,1,1,1,1]);function xt(t){return t&&typeof t=="object"&&"current"in t}const be=i.forwardRef(({children:t,eps:e=.001,style:s,className:o,prepend:a,center:n,fullscreen:h,portal:v,distanceFactor:g,sprite:u=!1,transform:l=!1,occlude:c,onOcclude:D,castShadow:y,receiveShadow:k,material:x,geometry:U,zIndexRange:L=[16777271,0],calculatePosition:G=ct,as:I="div",wrapperClass:R,pointerEvents:P="auto",...b},N)=>{const{gl:A,camera:M,scene:B,size:_,raycaster:q,events:O,viewport:W}=ee(),[m]=i.useState(()=>document.createElement(I)),Q=i.useRef(),j=i.useRef(null),se=i.useRef(0),Z=i.useRef([0,0]),F=i.useRef(null),S=i.useRef(null),p=v?.current||O.connected||A.domElement.parentNode,d=i.useRef(null),z=i.useRef(!1),X=i.useMemo(()=>c&&c!=="blending"||Array.isArray(c)&&c.length&&xt(c[0]),[c]);i.useLayoutEffect(()=>{const T=A.domElement;c&&c==="blending"?(T.style.zIndex=`${Math.floor(L[0]/2)}`,T.style.position="absolute",T.style.pointerEvents="none"):(T.style.zIndex=null,T.style.position=null,T.style.pointerEvents=null)},[c]),i.useLayoutEffect(()=>{if(j.current){const T=Q.current=lt(m);if(B.updateMatrixWorld(),l)m.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const f=G(j.current,M,_);m.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${f[0]}px,${f[1]}px,0);transform-origin:0 0;`}return p&&(a?p.prepend(m):p.appendChild(m)),()=>{p&&p.removeChild(m),T.unmount()}}},[p,l]),i.useLayoutEffect(()=>{R&&(m.className=R)},[R]);const de=i.useMemo(()=>l?{position:"absolute",top:0,left:0,width:_.width,height:_.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:n?"translate3d(-50%,-50%,0)":"none",...h&&{top:-_.height/2,left:-_.width/2,width:_.width,height:_.height},...s},[s,n,h,_,l]),Ue=i.useMemo(()=>({position:"absolute",pointerEvents:P}),[P]);i.useLayoutEffect(()=>{if(z.current=!1,l){var T;(T=Q.current)==null||T.render(i.createElement("div",{ref:F,style:de},i.createElement("div",{ref:S,style:Ue},i.createElement("div",{ref:N,className:o,style:s,children:t}))))}else{var f;(f=Q.current)==null||f.render(i.createElement("div",{ref:N,style:de,className:o,children:t}))}});const J=i.useRef(!0);te(T=>{if(j.current){M.updateMatrixWorld(),j.current.updateWorldMatrix(!0,!1);const f=l?Z.current:G(j.current,M,_);if(l||Math.abs(se.current-M.zoom)>e||Math.abs(Z.current[0]-f[0])>e||Math.abs(Z.current[1]-f[1])>e){const $=mt(j.current,M);let C=!1;X&&(Array.isArray(c)?C=c.map(H=>H.current):c!=="blending"&&(C=[B]));const Y=J.current;if(C){const H=ht(j.current,M,q,C);J.current=H&&!$}else J.current=!$;Y!==J.current&&(D?D(!J.current):m.style.display=J.current?"block":"none");const ne=Math.floor(L[0]/2),Pe=c?X?[L[0],ne]:[ne-1,0]:L;if(m.style.zIndex=`${dt(j.current,M,Pe)}`,l){const[H,ve]=[_.width/2,_.height/2],le=M.projectionMatrix.elements[5]*ve,{isOrthographicCamera:xe,top:Re,left:Fe,bottom:Ee,right:Ce}=M,Ie=pt(M.matrixWorldInverse),Ae=xe?`scale(${le})translate(${me(-(Ce+Fe)/2)}px,${me((Re+Ee)/2)}px)`:`translateZ(${le}px)`;let V=j.current.matrixWorld;u&&(V=M.matrixWorldInverse.clone().transpose().copyPosition(V).scale(j.current.scale),V.elements[3]=V.elements[7]=V.elements[11]=0,V.elements[15]=1),m.style.width=_.width+"px",m.style.height=_.height+"px",m.style.perspective=xe?"":`${le}px`,F.current&&S.current&&(F.current.style.transform=`${Ae}${Ie}translate(${H}px,${ve}px)`,S.current.style.transform=vt(V,1/((g||10)/400)))}else{const H=g===void 0?1:ft(j.current,M)*g;m.style.transform=`translate3d(${f[0]}px,${f[1]}px,0) scale(${H})`}Z.current=f,se.current=M.zoom}}if(!X&&d.current&&!z.current)if(l){if(F.current){const f=F.current.children[0];if(f!=null&&f.clientWidth&&f!=null&&f.clientHeight){const{isOrthographicCamera:$}=M;if($||U)b.scale&&(Array.isArray(b.scale)?b.scale instanceof E?d.current.scale.copy(b.scale.clone().divideScalar(1)):d.current.scale.set(1/b.scale[0],1/b.scale[1],1/b.scale[2]):d.current.scale.setScalar(1/b.scale));else{const C=(g||10)/400,Y=f.clientWidth*C,ne=f.clientHeight*C;d.current.scale.set(Y,ne,1)}z.current=!0}}}else{const f=m.children[0];if(f!=null&&f.clientWidth&&f!=null&&f.clientHeight){const $=1/W.factor,C=f.clientWidth*$,Y=f.clientHeight*$;d.current.scale.set(C,Y,1),z.current=!0}d.current.lookAt(T.camera.position)}});const pe=i.useMemo(()=>({vertexShader:l?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[l]);return i.createElement("group",je({},b,{ref:j}),c&&!X&&i.createElement("mesh",{castShadow:y,receiveShadow:k,ref:d},U||i.createElement("planeGeometry",null),x||i.createElement("shaderMaterial",{side:We,vertexShader:pe.vertexShader,fragmentShader:pe.fragmentShader})))}),gt=()=>parseInt(ze.replace(/\D+/g,"")),yt=gt();class Mt extends ke{constructor(e=new K){super({uniforms:{inputBuffer:new w(null),depthBuffer:new w(null),resolution:new w(new K),texelSize:new w(new K),halfTexelSize:new w(new K),kernel:new w(0),scale:new w(1),cameraNear:new w(0),cameraFar:new w(1),minDepthThreshold:new w(0),maxDepthThreshold:new w(1),depthScale:new w(0),depthToBlurRatioBias:new w(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${yt>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:Ge,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,s){this.uniforms.texelSize.value.set(e,s),this.uniforms.halfTexelSize.value.set(e,s).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class _t{constructor({gl:e,resolution:s,width:o=500,height:a=500,minDepthThreshold:n=0,maxDepthThreshold:h=1,depthScale:v=0,depthToBlurRatioBias:g=.25}){this.renderToScreen=!1,this.renderTargetA=new ce(s,s,{minFilter:ae,magFilter:ae,stencilBuffer:!1,depthBuffer:!1,type:we}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new Mt,this.convolutionMaterial.setTexelSize(1/o,1/a),this.convolutionMaterial.setResolution(new K(o,a)),this.scene=new Oe,this.camera=new $e,this.convolutionMaterial.uniforms.minDepthThreshold.value=n,this.convolutionMaterial.uniforms.maxDepthThreshold.value=h,this.convolutionMaterial.uniforms.depthScale.value=v,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=g,this.convolutionMaterial.defines.USE_DEPTH=v>0;const u=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),l=new Float32Array([0,0,2,0,0,2]),c=new He;c.setAttribute("position",new ge(u,3)),c.setAttribute("uv",new ge(l,2)),this.screen=new Ve(c,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,s,o){const a=this.scene,n=this.camera,h=this.renderTargetA,v=this.renderTargetB;let g=this.convolutionMaterial,u=g.uniforms;u.depthBuffer.value=s.depthTexture;const l=g.kernel;let c=s,D,y,k;for(y=0,k=l.length-1;y<k;++y)D=y&1?v:h,u.kernel.value=l[y],u.inputBuffer.value=c.texture,e.setRenderTarget(D),e.render(a,n),c=D;u.kernel.value=l[y],u.inputBuffer.value=c.texture,e.setRenderTarget(this.renderToScreen?null:o),e.render(a,n)}}let St=class extends De{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var s;(s=e.defines)!=null&&s.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}};const bt=i.forwardRef(({mixBlur:t=0,mixStrength:e=1,resolution:s=256,blur:o=[0,0],minDepthThreshold:a=.9,maxDepthThreshold:n=1,depthScale:h=0,depthToBlurRatioBias:v=.25,mirror:g=0,distortion:u=1,mixContrast:l=1,distortionMap:c,reflectorOffset:D=0,...y},k)=>{Le({MeshReflectorMaterialImpl:St});const x=ee(({gl:S})=>S),U=ee(({camera:S})=>S),L=ee(({scene:S})=>S);o=Array.isArray(o)?o:[o,o];const G=o[0]+o[1]>0,I=i.useRef(null);i.useImperativeHandle(k,()=>I.current,[]);const[R]=i.useState(()=>new Ne),[P]=i.useState(()=>new E),[b]=i.useState(()=>new E),[N]=i.useState(()=>new E),[A]=i.useState(()=>new ye),[M]=i.useState(()=>new E(0,0,-1)),[B]=i.useState(()=>new Me),[_]=i.useState(()=>new E),[q]=i.useState(()=>new E),[O]=i.useState(()=>new Me),[W]=i.useState(()=>new ye),[m]=i.useState(()=>new he),Q=i.useCallback(()=>{var S;const p=I.current.parent||((S=I.current)==null?void 0:S.__r3f.parent);if(!p||(b.setFromMatrixPosition(p.matrixWorld),N.setFromMatrixPosition(U.matrixWorld),A.extractRotation(p.matrixWorld),P.set(0,0,1),P.applyMatrix4(A),b.addScaledVector(P,D),_.subVectors(b,N),_.dot(P)>0))return;_.reflect(P).negate(),_.add(b),A.extractRotation(U.matrixWorld),M.set(0,0,-1),M.applyMatrix4(A),M.add(N),q.subVectors(b,M),q.reflect(P).negate(),q.add(b),m.position.copy(_),m.up.set(0,1,0),m.up.applyMatrix4(A),m.up.reflect(P),m.lookAt(q),m.far=U.far,m.updateMatrixWorld(),m.projectionMatrix.copy(U.projectionMatrix),W.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),W.multiply(m.projectionMatrix),W.multiply(m.matrixWorldInverse),W.multiply(p.matrixWorld),R.setFromNormalAndCoplanarPoint(P,b),R.applyMatrix4(m.matrixWorldInverse),B.set(R.normal.x,R.normal.y,R.normal.z,R.constant);const d=m.projectionMatrix;O.x=(Math.sign(B.x)+d.elements[8])/d.elements[0],O.y=(Math.sign(B.y)+d.elements[9])/d.elements[5],O.z=-1,O.w=(1+d.elements[10])/d.elements[14],B.multiplyScalar(2/B.dot(O)),d.elements[2]=B.x,d.elements[6]=B.y,d.elements[10]=B.z+1,d.elements[14]=B.w},[U,D]),[j,se,Z,F]=i.useMemo(()=>{const S={minFilter:ae,magFilter:ae,type:we},p=new ce(s,s,S);p.depthBuffer=!0,p.depthTexture=new qe(s,s),p.depthTexture.format=Ze,p.depthTexture.type=Xe;const d=new ce(s,s,S),z=new _t({gl:x,resolution:s,width:o[0],height:o[1],minDepthThreshold:a,maxDepthThreshold:n,depthScale:h,depthToBlurRatioBias:v}),X={mirror:g,textureMatrix:W,mixBlur:t,tDiffuse:p.texture,tDepth:p.depthTexture,tDiffuseBlur:d.texture,hasBlur:G,mixStrength:e,minDepthThreshold:a,maxDepthThreshold:n,depthScale:h,depthToBlurRatioBias:v,distortion:u,distortionMap:c,mixContrast:l,"defines-USE_BLUR":G?"":void 0,"defines-USE_DEPTH":h>0?"":void 0,"defines-USE_DISTORTION":c?"":void 0};return[p,d,z,X]},[x,o,W,s,g,G,t,e,a,n,h,v,u,c,l]);return te(()=>{var S;const p=I.current.parent||((S=I.current)==null?void 0:S.__r3f.parent);if(!p)return;p.visible=!1;const d=x.xr.enabled,z=x.shadowMap.autoUpdate;Q(),x.xr.enabled=!1,x.shadowMap.autoUpdate=!1,x.setRenderTarget(j),x.state.buffers.depth.setMask(!0),x.autoClear||x.clear(),x.render(L,m),G&&Z.render(x,j,se),x.xr.enabled=d,x.shadowMap.autoUpdate=z,p.visible=!0,x.setRenderTarget(null)}),i.createElement("meshReflectorMaterialImpl",je({attach:"material",key:"key"+F["defines-USE_BLUR"]+F["defines-USE_DEPTH"]+F["defines-USE_DISTORTION"],ref:I},F,y))}),ie=[1.15,1.65,2.15,2.65,3.15];function jt(){return i.useMemo(()=>{const t=e=>({mat:new De({color:"#1a0202",emissive:new et("#e10600"),emissiveIntensity:0}),target:e});return{dais:t(2.2),signal:t(2.4),strata:t(2),perimeter:t(1.1)}},[])}function oe(t,e,s){const o=t-e;if(o<=0)return 0;const a=Math.min(o/.55,1),n=o<.75?Math.max(0,Math.sin(o/.75*Math.PI))*.5:0;return a*s+n}function Tt({mats:t,scrollY:e,reducedMotion:s,compact:o,igniteAt:a}){const n=jt(),h=i.useRef(null),v=i.useRef([]),g=i.useRef(null);return te(({clock:u})=>{const l=s?.3:.1+e.current*.95,c=.46+l*.52;if(ie.forEach((k,x)=>{const U=v.current[x];U&&(U.position.y=x*c)}),g.current&&(g.current.position.y=ie.length*c+.32),h.current.rotation.y=.18+(s?0:e.current*.55),s){n.dais.mat.emissiveIntensity=n.dais.target,n.signal.mat.emissiveIntensity=n.signal.target,n.strata.mat.emissiveIntensity=n.strata.target,n.perimeter.mat.emissiveIntensity=n.perimeter.target;return}const D=a.current,y=D==null?-1:u.elapsedTime-D;n.dais.mat.emissiveIntensity=y<0?0:oe(y,0,n.dais.target),n.signal.mat.emissiveIntensity=y<0?0:oe(y,.45,n.signal.target),n.strata.mat.emissiveIntensity=y<0?0:oe(y,.95,n.strata.target+l*1.2),n.perimeter.mat.emissiveIntensity=y<0?0:oe(y,1.6,n.perimeter.target)}),r.jsxs("group",{position:[o?0:2.3,0,0],scale:o?.78:.9,children:[r.jsxs("group",{ref:h,position:[0,.85,0],children:[ie.map((u,l)=>r.jsxs("group",{ref:c=>v.current[l]=c,children:[r.jsx(_e,{args:[u,.3,u],radius:.05,smoothness:3,material:l%2?t.obsidian:t.lacquer}),r.jsx("mesh",{material:t.gunmetal,position:[0,-.06,u/2+.005],children:r.jsx("boxGeometry",{args:[u*.62,.045,.012]})}),r.jsx("mesh",{material:t.gunmetal,position:[u/2+.005,-.06,0],children:r.jsx("boxGeometry",{args:[.012,.045,u*.62]})}),l%2===0&&r.jsx("mesh",{material:n.strata.mat,position:[u/2-.12,.02,u/2+.006],children:r.jsx("boxGeometry",{args:[.09,.03,.01]})}),l<ie.length-1&&r.jsxs(r.Fragment,{children:[r.jsx("mesh",{material:t.glass,position:[0,.23,0],children:r.jsx("boxGeometry",{args:[u*.82,.16,u*.82]})}),r.jsx("mesh",{material:n.strata.mat,position:[0,.23,0],children:r.jsx("boxGeometry",{args:[u*.55,.05,u*.55]})})]})]},l)),r.jsx("mesh",{ref:g,material:t.gunmetal,rotation:[0,Math.PI/4,0],children:r.jsx("coneGeometry",{args:[.5,.6,4]})}),!o&&!s&&r.jsx(be,{position:[-2.35,1.9,0],className:"s-label mono",occlude:!1,zIndexRange:[3,3],children:"Strata · Cognition Archive"})]}),r.jsx("mesh",{material:n.signal.mat,position:[0,-.65,0],children:r.jsx("cylinderGeometry",{args:[.035,.035,3,12]})}),r.jsxs("group",{position:[0,-2.3,0],children:[r.jsx("mesh",{material:t.ceramic,children:r.jsx("cylinderGeometry",{args:[1.9,2.2,.28,64]})}),r.jsx("mesh",{material:t.gunmetal,position:[0,-.24,0],children:r.jsx("cylinderGeometry",{args:[2.45,2.6,.2,64]})}),r.jsx("mesh",{material:n.dais.mat,position:[0,.15,0],rotation:[-Math.PI/2,0,0],children:r.jsx("torusGeometry",{args:[1.4,.012,8,96]})}),[0,1,2].map(u=>{const l=u/3*Math.PI*2+.4;return r.jsx("mesh",{material:t.steel,position:[Math.cos(l)*1.72,.145,Math.sin(l)*1.72],children:r.jsx("boxGeometry",{args:[.16,.015,.05]})},u)}),!o&&!s&&r.jsx(be,{position:[2.5,.25,0],className:"s-label mono",occlude:!1,zIndexRange:[3,3],children:"Signal · TYO-000"})]}),[-2.6,-1.55,-.5,.55,1.6,2.65].map((u,l)=>r.jsxs("group",{position:[Math.sin(u)*8.2,.6,-3.5-Math.cos(u)*(8.2*.55)],children:[r.jsx(_e,{args:[.62,7.2,.62],radius:.06,smoothness:2,material:t.obsidian}),r.jsx("mesh",{material:n.perimeter.mat,position:[0,.4,.315],children:r.jsx("boxGeometry",{args:[.03,5.6,.012]})}),r.jsx("mesh",{material:t.gunmetal,position:[0,-2.9,0],children:r.jsx("boxGeometry",{args:[.86,.35,.86]})})]},l)),r.jsxs("group",{position:[o?0:-1.5,1.6,-13],children:[r.jsx("mesh",{material:t.steel,rotation:[0,0,-.42],position:[-1.05,0,0],children:r.jsx("boxGeometry",{args:[.14,5.2,.05]})}),r.jsx("mesh",{material:t.steel,rotation:[0,0,.42],position:[1.05,0,0],children:r.jsx("boxGeometry",{args:[.14,5.2,.05]})}),r.jsx("mesh",{material:n.perimeter.mat,position:[0,-1.35,0],children:r.jsx("boxGeometry",{args:[1.7,.1,.05]})})]})]})}function wt({tier:t}){return t==="high"?r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-2.87,0],children:[r.jsx("planeGeometry",{args:[70,44]}),r.jsx(bt,{blur:[280,70],resolution:1024,mixBlur:.9,mixStrength:.55,roughness:.55,depthScale:1.1,minDepthThreshold:.4,maxDepthThreshold:1.4,color:"#08080a",metalness:.55,mirror:.55})]}):r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-2.87,0],children:[r.jsx("planeGeometry",{args:[70,44]}),r.jsx("meshStandardMaterial",{color:"#08080a",metalness:.6,roughness:.4})]})}function Dt({scrollY:t,compact:e}){const{camera:s,pointer:o}=ee();return te((a,n)=>{const h=1-Math.pow(.002,n),g=(e?14.6:12.6)-Ye.clamp(t.current,0,1)*3.1;s.position.z+=(g-s.position.z)*h,s.position.x+=(o.x*.5-s.position.x)*h*.5,s.position.y+=(.7+o.y*.3-s.position.y)*h*.5,s.lookAt(e?0:1.15,.05,0)}),null}function It({tier:t,reducedMotion:e,scrollY:s,ignited:o}){const a=typeof window<"u"&&window.innerWidth<780,[n,h]=i.useState(!1),v=i.useRef(null);return r.jsxs(Je,{className:`hero__scene${n?" hero__scene--live":""}`,onCreated:()=>requestAnimationFrame(()=>requestAnimationFrame(()=>h(!0))),shadows:t==="high",dpr:[1,t==="high"?1.8:1.35],gl:{antialias:t!=="high",powerPreference:"high-performance",stencil:!1},camera:{fov:34,near:.1,far:90,position:[0,.7,a?14.6:12.6]},children:[r.jsx("color",{attach:"background",args:["#050505"]}),r.jsx("fog",{attach:"fog",args:["#050505",13,30]}),r.jsx("ambientLight",{intensity:.16,color:"#20222a"}),r.jsx("spotLight",{position:[7,12,9],angle:.45,penumbra:1,intensity:t==="high"?480:340,color:"#dfe4ee",distance:50,decay:1.4,castShadow:t==="high","shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-bias":-4e-4}),r.jsx("spotLight",{position:[-9,3,-5],angle:.6,penumbra:1,intensity:170,color:"#e10600",distance:36,decay:1.6}),r.jsx("pointLight",{position:[0,-1,9],intensity:45,color:"#8a90a0",distance:24,decay:1.7}),r.jsxs(Ke,{resolution:128,frames:1,children:[r.jsx(ue,{form:"rect",intensity:2.4,color:"#cfd6e2",scale:[10,14,1],position:[6,6,8]}),r.jsx(ue,{form:"rect",intensity:1.1,color:"#5a1010",scale:[8,12,1],position:[-8,2,-4]}),r.jsx(ue,{form:"rect",intensity:.7,color:"#20242c",scale:[16,16,1],position:[0,10,-10]})]}),r.jsx(Bt,{ignited:o,igniteAt:v}),r.jsx(Ut,{scrollY:s,reducedMotion:e,compact:a,igniteAt:v}),r.jsx(wt,{tier:t}),t==="low"&&r.jsx(tt,{position:[0,-2.82,0],opacity:.72,scale:18,blur:2.4,far:7,resolution:512,color:"#000000"}),r.jsx(Dt,{scrollY:s,compact:a}),r.jsx(rt,{multisampling:0,enableNormalPass:!1,children:[r.jsx(st,{intensity:t==="high"?.62:.48,luminanceThreshold:.74,luminanceSmoothing:.3,mipmapBlur:!0,radius:.68},"b"),r.jsx(nt,{mode:it.ACES_FILMIC},"t"),r.jsx(ot,{eskil:!1,offset:.3,darkness:.82},"v"),...t==="high"?[r.jsx(at,{},"s")]:[]]})]})}function Bt({ignited:t,igniteAt:e}){return te(({clock:s})=>{t&&e.current==null&&(e.current=s.elapsedTime)}),null}function Ut(t){const e=Qe();return r.jsx(Tt,{mats:e,...t})}export{It as HeroScene};
