export async function pesan(isiwarning, isiaction, Swal) {
  switch (isiaction) {
    case "error":
      return Swal.fire({
        html: isiwarning,
        icon: "error",
        customClass: {
          container: 'swal2-container-custom'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        target: $('.modal').get(0),
      });
      break;
    case "info":
      return Swal.fire({
        html: isiwarning,
        icon: "info",
        customClass: {
          container: 'swal2-container-custom'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        target: $('.modal').get(0),
      });
      break;
    case "success":
      return Swal.fire({
        position: "center",
        icon: "success",
        customClass: {
          container: 'swal2-container-custom'
        },
        html: isiwarning,
        allowOutsideClick: false,
        allowEscapeKey: false,
        target: $('.modal').get(0),
      });
      break;
    case "question":
      return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        customClass: {
          container: 'swal2-container-custom'
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        target: $('.modal').get(0),
      });
      // return  Swal.fire({
      //     title: 'Are you sure?',
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, delete it!'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       Swal.fire(
      //         'Deleted!',
      //         'Your file has been deleted.',
      //         'success'
      //       )
      //     }
      //   });
      break;
  }
}
export async function tunggu(Swal) {
  return Swal.fire({
    backdrop: true,
    position: "center",
    html: '<div class="circle-loader"></div>',
    text: "Please Wait...",
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}
