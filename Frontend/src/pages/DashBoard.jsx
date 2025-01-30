
const DashBoard = () => {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-lg mx-auto">
     <div className="m-0 h-80">
    <img
      className="w-full  object-cover"
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
      alt="ui/ux review check"
    />
  </div>

  <div className="p-6 h-150">
    <h4 className="text-blue-gray-900 text-2xl font-semibold">UI/UX Review Check</h4>
    <p className="mt-3 text-cyan-400 bg-slate-800 text-base font-normal">
      Because it's about motivating the doers. Because I'm here to
      follow my dreams and inspire.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada, erat in blandit ultricies, ex nibh malesuada purus, a interdum mauris risus id nunc. Vestibulum ut malesuada neque. Sed condimentum urna sed quam tincidunt interdum. Nulla facilisi. Integer in metus vitae ipsum varius accumsan. Cras efficitur arcu a augue viverra interdum. Mauris non dictum sapien. Etiam dignissim, purus nec tincidunt tristique, mi urna sollicitudin augue, eget consequat metus sem nec felis. Pellentesque eu felis eros. Suspendisse potenti. Nam at risus sed nunc pellentesque suscipit. Sed vulputate sem sit amet magna bibendum, non tempor erat pulvinar. Donec gravida tincidunt arcu a pharetra. Phasellus vel nibh sed justo varius molestie sit amet vel eros. Fusce fermentum, urna vel lobortis lacinia, eros justo suscipit augue, sit amet pellentesque nisi felis a enim. Sed eleifend enim at sem pretium, vel pellentesque erat sagittis.Because it's about motivating the doers. Because I'm here to
      follow my dreams and inspire.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada, erat in blandit ultricies, ex nibh malesuada purus, a interdum mauris risus id nunc. Vestibulum ut malesuada neque. Sed condimentum urna sed quam tincidunt interdum. Nulla facilisi. Integer in metus vitae ipsum varius accumsan. Cras efficitur arcu a augue viverra interdum. Mauris non dictum sapien. Etiam dignissim, purus nec tincidunt tristique, mi urna sollicitudin augue, eget consequat metus sem nec felis. Pellentesque eu felis eros. Suspendisse potenti. Nam at risus sed nunc pellentesque suscipit. Sed vulputate sem sit amet magna bibendum, non tempor erat pulvinar. Donec gravida tincidunt arcu a pharetra. Phasellus vel nibh sed justo varius molestie sit amet vel eros. Fusce fermentum, urna vel lobortis lacinia, eros justo suscipit augue, sit amet pellentesque nisi felis a enim. Sed eleifend enim at sem pretium, vel pellentesque erat sagittis.
    </p>
  </div>

  <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
    <div className="flex items-center -space-x-3">
      <div className="relative group">
        <img
          className="w-10 h-10 rounded-full border-2 border-white hover:z-10"
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
          alt="Natali Craig"
        />
        <div className="absolute -top-10 left-0 hidden bg-gray-800 text-white text-sm py-1 px-2 rounded group-hover:block">
          Natali Craig
        </div>
      </div>
      <div className="relative group">
        <img
          className="w-10 h-10 rounded-full border-2 border-white hover:z-10"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="Tania Andrew"
        />
        <div className="absolute -top-10 left-0 hidden bg-gray-800 text-white text-sm py-1 px-2 rounded group-hover:block">
          Tania Andrew
        </div>
      </div>
    </div>
    <p className="text-gray-500 text-sm font-normal">January 10</p>
  </div>
</div>


  )
}

export default DashBoard
