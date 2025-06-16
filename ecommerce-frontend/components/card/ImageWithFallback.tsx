'use client';

import { useState, useEffect } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ fallbackSrc = '/placeholder.png', ...props }: Props) {
  const [src, setSrc] = useState(props.src);

  // Nếu props.src thay đổi (ví dụ thay đổi URL), cập nhật lại src
  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <img
      {...props}
      src={src}
      onError={() => setSrc(fallbackSrc)}
      alt={props.alt || 'Ảnh sản phẩm'}
    />
  );
}
