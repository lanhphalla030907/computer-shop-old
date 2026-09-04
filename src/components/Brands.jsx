import React from 'react'

const Brands = () => {
    const Brands = [
    {
     src:"https://image-cdn-v2.jambuntech.dev/v89wnXAe3x7pve3vQimW8eTRCr4=/400x/filters:format(webp)/tk-file/aula_9e3c4c9fd8a06f83d073e8259e28b05a.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/7Nw9OAnsgmvLScHI-Kz4JyDMk3A=/400x/filters:format(webp)/tk-file/alienware_460efbf738807499f88836d24e5e8471.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/lKPYtb8JzA-EDGJupMLNyfpdeLo=/400x/filters:format(webp)/tk-files/asus_210fbbace2aee9298f7e37f7979c515d.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/67MRhMe0THY2waud3CrItjsXg20=/400x/filters:format(webp)/tk-files/rog_ffbfdc480ff2d3a3ba8db7bc0134521e.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/yaj-tJwDUPSwhcFlhQQmg7vFSeM=/400x/filters:format(webp)/tk-files/corsair_03dab35c1e5fc28e5b8077d6f155eeee.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/hb8NUP5twqjZlLqq7XB5Db-TqCg=/400x/filters:format(webp)/tk-files/msi_75f40a8cbe536c14eef1ce1f3f08b36a.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/zIg8hYruUukbMC1MpckrCkjn55o=/400x/filters:format(webp)/tk-files/ziyoulang_logo_29c289401b50b254f4fc777a0c986be1.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/oh6oDGpqTw9ZpXcyhzJcqXwS1ks=/400x/filters:format(webp)/tk-file/ipega_2325acd8bcf1a185c5d2445a67ef3a4a.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/S3rSZ4RcNWbl38pYq8_L6U93evY=/400x/filters:format(webp)/tk-file/razer_274312c7fe774a3b075385c991aad5a3.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/5EIpxXbb5mEl3EnracBbc29lI1A=/400x/filters:format(webp)/tk-file/mcdodo_d678d21d3e6a1c8162e8b98c2283f31b.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/aacquN9Ir5hBviqnmWg3EQex_WE=/400x/filters:format(webp)/tk-file/ugreen_fd2fa5e06c578c3bc81cedc695406012.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/aUo47aX3ci4_MrNMdQnHou7X_A0=/400x/filters:format(webp)/tk-file/spector_cb0840857006871b0c1bedc988227fda.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/VHeChuuiTJBql9rK_eubDlvKUoM=/400x/filters:format(webp)/tk-files/puskill_0974f3d95e098e94a7314f3233e237af.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/OMsKiNidjZfQYBOa1D2qQcRpIX4=/400x/filters:format(webp)/tk/1_4dc17d68f8.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/9_gK1zASkzew-04h_TbGssVAajI=/400x/filters:format(webp)/tk-file/xbox_3d1e726a891b2e33c5f211d115de9f84.jpg",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/_O7HsWE7ATWW8x4skyEKShpwvHU=/400x/filters:format(webp)/tk/1_3fe324d55f.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/7RMrZw--eObpjMAWpj14CeoJmxw=/400x/filters:format(webp)/tk/1_0a12880812.png",
    },
    {
     src:"https://image-cdn-v2.jambuntech.dev/QpUheuEIBnZ2JunGLhNjV8tJTyA=/400x/filters:format(webp)/tk/1_67eedec736.png",
    },
  
    {
     src:"https://image-cdn-v2.jambuntech.dev/XVJs7CY-7sJJQX1CTz9VJKlwQWM=/400x/filters:format(webp)/tk/1_a406ff1fe5.png",
    },
  ]
  return (
    <div><div className="w-full bg-gray-50 px-5 py-5 items-center shadow overflow-hidden">
        <div className="scroll-track flex gap-10 ">
          {Brands.map((img,i) => (
              <img key={i} className="w-25 h-25" src={img.src} alt="" />
            ))}
        </div>
      </div></div>
  )
}

export default Brands