interface IGetMapInitOptionsProps {
  center: any;
  zoom: number;
  zoomControl: boolean;
  // zoomControlOptions: {
  //   position: any;
  //   style: any;
  // };
}

export const loadScript = (src: string, onLoad: () => void): void => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const getMapInitOptions: () => IGetMapInitOptionsProps = () => ({
  // center: new window.naver.maps.LatLng(37.4886731, 127.0521102)
  center: new window.naver.maps.LatLng(37.38282, 127.118926),
  zoom: 15,
  zoomControl: true,
  // zoomControlOptions: {
  //   position: window.naver.maps.Position.BOTTOM_LEFT,
  //   style: window.naver.maps.ZoomControlStyle.SMALL,
  // },
});
