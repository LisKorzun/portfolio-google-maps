import { template } from 'lodash'

const complexOfficeInfo = `
<div class="flex">
<img src="<%= image %>" class="w-[120px] h-[150px] bg-center rounded-l-md mr-2"/>
<div class="flex flex-col justify-between">
<div>
<img src="<%= logo %>" class="my-2 h-[12px]" alt="<%= city %>"/>
<div class="text-base text-primary-dark font-bold mb-1.5">Office in <%= city %></div>
<div class="text-[10px] font-medium text-slate-500 mb-1"><%= country %></div>
<div class="text-[10px] font-medium text-slate-500 mb-1"><%= address %></div>
<div class="text-[10px] font-medium text-slate-500 mb-1"><%= phone %></div>
</div>
<div>
<a href="tel:<%= phone %>" class="text-white bg-primary-dark outline-none hover:bg-gradient-to-bl focus:outline-none font-medium rounded-md text-[10px] px-3 py-2 text-center mr-2 inline-flex">
 Click to call</a>
</div>
</div>
</div>
`
export const templateComplexInfo = template(complexOfficeInfo)
