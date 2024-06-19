import { redirect, error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

/** @type {import('./$types').LayoutServerLoad} */
export async function load(data) {

   if(data.params.slug){
      let pb_admin = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
      const admin = await pb_admin.admins.authWithPassword(import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL, import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD);

      if(!(admin && pb_admin.authStore.isValid)){
         error(404, {
            message: 'Not found'
         });

      }

      let dbdata;

      try {

         dbdata = await pb_admin.collection('links').getOne(data.params.slug);

         
      } catch (er) {

         error(404, {
            message: 'Not found'
         });
         
      }

      if(!dbdata.url){
         error(404, {
            message: 'Not found'
         });
      }

      redirect(301,dbdata.url)


}

}