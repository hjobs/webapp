/**
 * A snippet to reload FB
 */

// componentDidMount() {
//   const nextJob = nextProps.job;
//   const thisJob = this.props.job;
  // console.log(["nextJob, thisJob", nextJob, thisJob]);
  // if (
  //   // (!!nextJob && !thisJob) ||
  //   // (!!nextJob && !!thisJob && thisJob.id !== nextJob.id)
  //   !!this.props.job
  // ) {
  //   console.log("will execute");
  //   // document.getElementById("facebook-script").remove();
  //   document.getElementById("fb-root").remove();
  //   document.getElementById("facebook-jssdk").remove();
  //   const fbRoot = document.createElement("div");
  //   fbRoot.id = "fb-root"
  //   document.getElementsByTagName("body")[0].appendChild(fbRoot);
  //   window.setTimeout(() => {
  //     console.log("inside delayed");
  //     this.reloadFb(document, 'script', 'facebook-jssdk')
  //   }, 2000
  //   )
  // }
// }

// reloadFb(d, s, id) {
//   window.FB.init({
//     appId: "1267662459949897",
//     xfbml      : true,
//     version    : 'v2.1'
//   });
//   var js, fjs = d.getElementsByTagName(s)[0];
//   console.log(d.getElementById(id));
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.9&appId=1267662459949897";
//   fjs.parentNode.insertBefore(js, fjs);
// }