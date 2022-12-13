# ARTS-1422 project: Data visualization
This is a visualization of the [Yelp Dataset](https://www.yelp.com/dataset) which contains a map, a word stream plot, a scatter plot and a box plot.  
This project is done with ```Vue``` and ```D3.js``` for the front end part and ```flask``` , ```pandas``` and ```gensim``` for the back end parts.  
We are rookies in html, css and more and lack in time, so the web page is a bit ugly, sorry for that.

## Run instruction

If you use vscode, use ```Ctrl+Shift+P```:   
```task: run tasks > task: install dependencies > task: run task: start app```

if not in vscode(recommended)   
run npm install in both front end and back end.   
Then run npm run start in both front end and back end. 

```ps1
cd backend
pip install flask pandas
flask run -p 3001
```
```ps1
cd frontend
npm install
npm run start
```

The index for the web page should be:
http://localhost:3000/map

## Demo

Check the folder ```\design_and_presentations``` for details.

![image-20220613032345067](README.assets/image-20220613032345067.png)

![image-20220613032523226](README.assets/image-20220613032523226.png)

![image-20220613032424518](README.assets/image-20220613032424518.png)



![image-20220613032616278](README.assets/image-20220613032616278.png)

![image-20220613032318413](README.assets/image-20220613032318413.png)
