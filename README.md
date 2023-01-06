# ARTS-1422 project: Data visualization

## Setup and Publish tips

*All data in: [drive](https://drive.google.com/drive/folders/10iis24J7SkGIADnydgx4G3OoQe_0zA5A?usp=share_link)*

Paste the folder precomputed_data into frontend/public/precomputed_data!!!

*Publish:* in directory frontend, run `bash deploy.sh`, then goto [repo](https://github.com/IN4089-Groep-32/in4089-groep-32.github.io/actions/runs/3687066302) and choose `Re-run all jobs`. After all three jobs finished, you can see the results on [page](https://in4089-groep-32.github.io/).

## Readme

This is a visualization of the [Yelp Dataset](https://www.yelp.com/dataset) which contains a map, a word stream plot, a scatter plot and a box plot.  
This project is done with ```Vue``` and ```D3.js``` for the front end part and ```flask``` , ```pandas``` and ```gensim``` for the back end parts.  
We are rookies in html, css and more and lack in time, so the web page is a bit ugly, sorry for that.

## Run instruction

```ps1
cd frontend
npm install
npm run start
```
