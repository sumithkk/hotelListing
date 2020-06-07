import React from "react";

function Sort(props) {
  return (
    <svg viewBox="0 0 512 512" width="1em" height="1em" {...props}>
      <path d="M265.587 78.783H15.044C6.736 78.783 0 85.518 0 93.827s6.736 15.044 15.044 15.044h250.544c8.308 0 15.044-6.736 15.044-15.044s-6.736-15.044-15.045-15.044zM295.371 142.598H15.044C6.736 142.598 0 149.333 0 157.642c0 8.308 6.736 15.044 15.044 15.044h280.327c8.308 0 15.044-6.736 15.044-15.044 0-8.309-6.735-15.044-15.044-15.044zM253.425 205.67H15.044C6.736 205.67 0 212.405 0 220.714s6.736 15.044 15.044 15.044h238.381c8.308 0 15.044-6.736 15.044-15.044s-6.736-15.044-15.044-15.044zM287.106 269.59H15.044C6.736 269.59 0 276.326 0 284.634s6.736 15.044 15.044 15.044h272.062c8.308 0 15.044-6.736 15.044-15.044s-6.736-15.044-15.044-15.044zM190.825 332.662H15.044C6.736 332.662 0 339.398 0 347.706s6.736 15.044 15.044 15.044h175.782c8.308 0 15.044-6.736 15.044-15.044s-6.736-15.044-15.045-15.044zM219.91 396.723H15.044C6.736 396.723 0 403.458 0 411.767s6.736 15.044 15.044 15.044H219.91c8.308 0 15.044-6.736 15.044-15.044s-6.735-15.044-15.044-15.044z" />
      <path d="M497.49 329.507c-9.355-9.356-21.796-14.509-35.028-14.509-9.37 0-18.338 2.597-26.101 7.429V71.414c0-27.315-22.222-49.537-49.537-49.537s-49.537 22.222-49.537 49.537v251.318c-7.872-5.028-17.018-7.734-26.583-7.734-13.232 0-25.672 5.153-35.027 14.509-9.356 9.356-14.51 21.796-14.51 35.028s5.154 25.672 14.51 35.028l74.032 74.033a15.057 15.057 0 001.676 2.017c9.355 9.356 21.796 14.509 35.027 14.509 1.222 0 2.434-.059 3.641-.145 11.565-.765 22.911-5.544 31.729-14.363a15.184 15.184 0 001.682-2.025l74.027-74.026c9.357-9.356 14.511-21.797 14.511-35.029-.002-13.231-5.156-25.671-14.512-35.027zm-21.275 48.781l-76.051 76.051c-3.611 3.611-8.393 5.615-13.488 5.684-4.954-.02-9.903-1.913-13.675-5.684l-76.05-76.051c-3.674-3.674-5.698-8.558-5.698-13.752s2.024-10.079 5.698-13.753 8.557-5.697 13.753-5.697a19.32 19.32 0 0113.752 5.697l17.234 17.233c.186.186.385.348.578.522.171.153.333.315.51.46.241.199.492.374.742.555.147.107.288.222.439.323.258.174.526.325.791.481.157.092.31.192.471.279.259.138.523.258.788.38.182.085.361.177.548.254.251.104.508.19.763.28.21.074.415.154.629.22.252.076.507.133.762.196.223.055.443.118.67.163.288.057.578.092.869.132.198.027.391.065.59.085.495.049.993.075 1.49.075h.006c.492 0 .984-.026 1.474-.074.238-.023.467-.067.701-.101.251-.036.501-.065.75-.114.271-.053.534-.127.798-.195.209-.053.419-.098.626-.16.266-.08.523-.18.782-.274.202-.073.405-.139.605-.222.251-.104.492-.225.737-.342.199-.095.399-.183.595-.287.249-.132.485-.283.725-.428.179-.108.36-.209.535-.325.291-.194.567-.406.842-.619.112-.086.23-.163.339-.254a15.18 15.18 0 002.132-2.132c.072-.088.133-.183.204-.272.233-.298.461-.599.672-.914.099-.148.184-.304.276-.454.164-.267.331-.533.479-.811.086-.161.157-.328.237-.491.135-.279.273-.557.392-.844.063-.154.113-.314.172-.47.113-.304.228-.608.322-.921.043-.145.074-.293.113-.439.087-.327.176-.653.242-.989.028-.144.042-.29.066-.435.056-.338.114-.674.147-1.019.015-.156.013-.314.024-.47.021-.327.05-.652.05-.985V71.414c0-10.724 8.724-19.45 19.45-19.45 10.725 0 19.45 8.725 19.45 19.45v285.481c0 .497.026.996.075 1.491.021.218.062.429.093.644.038.271.07.542.123.81.05.251.118.494.181.74.058.229.108.459.177.686.074.245.165.48.252.719.08.224.154.448.245.669.093.226.204.443.308.663.105.225.206.45.323.67.115.215.246.418.37.627.127.213.247.427.386.635.158.237.334.46.505.687.124.164.238.334.369.493.632.77 1.337 1.475 2.107 2.107.152.125.313.233.469.351.236.179.467.36.714.525.198.131.402.246.604.367.219.131.434.269.66.39.207.11.419.204.63.304.234.111.464.228.705.327.203.084.41.151.617.226.257.093.51.192.773.271.202.061.406.104.61.156.272.07.542.145.818.2.226.044.453.07.681.104.258.039.513.086.774.111.386.038.774.051 1.163.059.104.002.207.016.312.016s.208-.014.312-.016c.388-.008.776-.021 1.163-.059.262-.025.516-.073.774-.111.228-.034.455-.059.681-.104.279-.055.549-.13.821-.201.202-.052.406-.095.606-.155.265-.08.521-.179.778-.272.205-.074.41-.14.612-.224.243-.1.475-.218.711-.33.209-.099.419-.192.624-.301.231-.123.449-.263.673-.397.198-.119.397-.23.59-.358.255-.17.495-.358.738-.543.147-.112.3-.214.444-.332.39-.32.765-.658 1.121-1.015l16.741-16.744c3.674-3.674 8.558-5.697 13.753-5.697s10.079 2.023 13.753 5.698a19.32 19.32 0 015.698 13.752 19.315 19.315 0 01-5.695 13.754z" />
    </svg>
  );
}

const MemoSort = React.memo(Sort);
export default MemoSort;