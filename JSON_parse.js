const {
  text
} = require("express");
const fs = require("fs");
const {
  result,
  isNumber
} = require("lodash");
const util = require('util');
const {
  Pool,
  Client
} = require('pg')
const client = new Pool({
  "label": "localhost",
  "host": "localhost",
  "user": "postgres",
  "port": 5433,
  "ssl": false,
  "database": "json_store",
  "password": "789456123"
})


function clear_table() {
  const text = `delete from users where id in (select id from users)`
  const values = []
  client.query(text, values, (err, res) => {
    if (err) {
      throw err.stack;
    } else {
      // console.log(res.rows[0])
    }
  })
}

function insert_into_users_table(array) {
  const text = 'INSERT INTO users(first_name, middle_name, last_name,zip_code) VALUES($1, $2, $3, $4) RETURNING *'
  const [first_name, middle_name, last_name, zip_code] = array;


  // callback
  client.query(text, array, (err, res) => {
    if (err) {
      throw err.stack;
    } else {
      // console.log(res.rows)
    }
  })
}




class JSON_PARSER {
  constructor() {

    this.tree = {
      root: {}
    }
    this.encode = 40;
    this.data_base = {}
    this.encoded_data_base = {}
    this.decode_data_base = []
    this.is_valid_object = false;
  }


  /**
   * @param {String} str - JSON string object
   */
  is_valid_JSON(str) {
    const isJson = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        //Error
        //JSON is not okay
        return false;
      }
      return true;
    }

    this.is_valid_object = isJson(str)
    return this.is_valid_object;
  }
  encoding_search(word) {
    if (this.encoded_data_base[word]) return [true, this.encoded_data_base[word]]

    return [false, word]



  }
  encode_name(word) {
    // console.log(word)
    if (word.constructor != String) throw new TypeError('wrong type for encoding name')
    if (!this.encoded_data_base[word]) {
      // console.log(this.encode_data_base, (this.encode).toString(), word)

      this.encoded_data_base[word] = (this.encode).toString();

      this.decode_data_base[this.encode++] = word;
    }
    return this.encoded_data_base[word]
  }
  decode_name(num, encoded = true) {
    if (!encoded) return num;
    if (!num) return "";

    // console.log('num', num)
    if (num.constructor === String)
      if (this.decode_data_base[num]) {
        return this.decode_data_base[num]
      }

  }
  parse_json(json, ovr = false) {

    if (!ovr) return false;
    let temp_obj = json;
    let stack = [temp_obj];
    while (stack.length) {
      let node = stack.pop();
      const check_all_fields = {};
      Object.keys(this.data_base).forEach(key => check_all_fields[key] = 0);

      let missing_keys = [];
      for (let search_key in check_all_fields) {

        if (node[search_key]) {
          ++check_all_fields[search_key];

          missing_keys.push(search_key)
        }
      }

      if (missing_keys.length > 0) {
        for (let missed_key in check_all_fields) {
          if (!check_all_fields[missed_key]) {
            this.data_base[missed_key].push('404')

          } else {
            this.data_base[missed_key].push(node[missed_key])

          }
        }

      }

      for (let key in node) {
        let constructor = node[key].constructor
        if (constructor === Object) stack.push(node[key])
        if (constructor === Array) {
          for (let sub_obj of node[key]) {

            let sub_constructor = sub_obj.constructor;

            if (sub_constructor === Object) {
              stack.push(sub_obj);
            }
          }
        }
      }
    }


    let data_base = this.data_base;


    if (this.if_static_object_load_return_boolean(ovr)) this.creat_tree();
  }

  creat_tree() {



    // let diagnal = keys.map(key => this.data_base[key][index]);
    // let temp = this.tree.root;
    // let len = diagnal.length;
    // let char_index = 0;

    // for (let line of diagnal) {

    //   char_index++

    //   if (!temp[line]) {
    //     temp[line] = {}
    //   }

    //   if ((temp[line] || {})["*"]) {
    //     if (!(temp[line] || {})["*"].includes(index)) {
    //       (temp[line] || {})["*"].push(index)
    //     }
    //   }

    //   if (len === char_index && !(temp[line] || {})["*"]) {
    //     temp = temp[line];
    //     temp['*'] = [index]
    //   }
    //   temp = temp[line]
    // }




    let keys = Object.keys(this.data_base);
    for (let key of keys) {
      let search_term = this.data_base[key].length;
      // console.log('search_ter:    ', search_term)
      if (!search_term) continue;

      let index = 1;

      for (let word of this.data_base[key].map(w => w.toLowerCase())) {




        if (word === "404") {
          index++;
          continue;
        }
        let temp = this.tree.root;
        let len = word.length;
        let char_index = 0;

        for (let letter of word) {

          char_index++

          if (!temp[letter]) {
            temp[letter] = {}
          }

          if ((temp[letter] || {})["*"]) {

            (temp[letter] || {})["*"].add(index)

          }

          if (len === char_index && !(temp[letter] || {})["*"]) {
            temp = temp[letter];
            temp['*'] = new Set([index])
          }
          temp = temp[letter]
        }





        index++;
      }

    }

    this.write_static_object_return_boolean()
  }


  write_static_object_return_boolean() {

    let success_fail = true;
    let file = fs.createWriteStream('tree');
    file.on('error', (e) => {
      success_fail = false;
      console.error(e)
      file.end()

    })
    let str = JSON.stringify(this.tree.root).split("")
    while (str.length) file.write(str.shift());
    file.close();
    return success_fail
  }

  if_static_object_load_return_boolean(ovr) {

    const obj = fs.readFileSync(`tree`, 'utf8')
    if (obj.length && !ovr) {
      this.tree.root = eval(fs.readFileSync(`tree`, 'utf8'));
      return false;
    }

    return true;
  }
  /**
   * @param {String} str - string to search cross cardinality
   * @param {Bool} test - run with test
   * @param {Intager} limit - limit results
   */
  find(stri, test = false, limit = 100000000000) {
    if (!stri.length) return 'no results for query 404';
    if (this.is_valid_object) return 'no results for query 404'
    console.log(stri)
    stri = stri.split(" ");
    stri = stri.map(x => x.toLowerCase().trim());
    // let [encoded, str] = this.encoding_search(stri)
    // console.log('encoded', encoded, str)
    // check if one string is a substring of another
    if (stri.length > 1) {

    }

    // if (!str) return 'no results for query 404'
    // console.log('str', str)

    stri.sort((a, b) => a.length - b.length)
    console.log(stri)
    const stack = [];
    const splits = stri.length;
    let filter_intersections = [];
    filter_intersections.length = splits + 1;
    filter_intersections.fill(new Object())
    let fil_id = splits + 1



    for (let str of stri) {

      let traversal_node = this.tree.root;

      for (let char of str) {

        if (traversal_node[char]) {

          traversal_node = traversal_node[char]
        } else return 'no results for query 404';

      }

      stack.push({
        node: traversal_node,
        str: str,
        filter: --fil_id
      })

    }
    console.log('stack', stack)
    let cardinality_traversal = []
    let cas_fil = 1;
    while (stack.length) {

      let {
        node,
        str,
        filter
      } = stack.pop()

      if (filter_intersections[0][str]) continue;
      filter_intersections[0][str] = 1;

      let keys = Object.keys(node);
      cas_fil = 1 === filter ? 1 : filter - 1;


      if (filter == 2) {
        console.log('do someting')
      }
      if (node["*"]) {


        node["*"].forEach(i => {
          if ((filter === 1 && !filter_intersections[cas_fil][i]) || (filter !== 1 && filter_intersections[cas_fil][i])) {
            cardinality_traversal.push([str, i - 1])
            filter_intersections[cas_fil][i] = 1;
          }
        })




        if (cardinality_traversal.length >= limit) {
          break;
        }

        let key = str[str.length - 1]
        if (node[key]) {
          let build_node = {
            node: node[key],
            str: str,
            filter: filter
          };
          build_node.str = build_node.str.concat(key)
          stack.push(build_node)
        }
      }



      for (let key of keys) {
        if (key === "*") continue
        let node_stack = {
          node: node[key],
          str: str,
          filter: filter
        };
        node_stack.str = node_stack.str.concat(key)
        stack.push(node_stack)
      }



    }




    console.log('filtered--f>', filter_intersections)
    console.log('intersect-->', cardinality_traversal)


    let count = []
    let nodes = []

    let in_common = cardinality_traversal.reduce((acc, [word, index]) => {


      if (!count[index]) {
        count[index] = (count[index] || 0)

        nodes[index] = (nodes[index] || new Set())
        acc.push([word, index, count, nodes])
      }
      count[index]++
      nodes[index].add(word)
      return acc;


    }, []).map(([word, index, count, nodes]) => [word, index, count[index],
      [...nodes[index]]
    ]).filter(([_1, _2, count, nodes]) => nodes.length == splits)

    console.log('in_common-->', in_common)











    // intersect = cardinality_traversal.map(x => x[1])



    // let table_results = intersect.map(result => Object.values(this.data_base).map((x) => x[result]))
    // let lables = Object.keys(this.data_base)



    // table_results = table_results.reduce((arr, val) => {
    //   let obj = {}
    //   val.forEach((set, i) => {

    //     obj[lables[i]] = this.data_base[set];
    //   })
    //   arr.push(obj)
    //   return arr;
    // }, []);

    // // if (test) {
    // //   return [table_results, cardinality_traversal]
    // // }
    // return table_results
  }
  insert_into_database() {
    let index = 0;
    const first_key = Object.keys(this.data_base)[0];






    const data_fileds = Array.from(new Array(this.data_base[first_key].length), (a) => []);
    while (index < this.data_base[first_key].length) {
      for (let key in this.data_base) {
        let value = this.data_base[key][index];


        if (key === 'zip_code' && value.split("").some(letter => ('a'.charCodeAt() <= letter.charCodeAt() || letter.charCodeAt() >= 'z'.charCodeAt()))) {
          // instead of throwing  error on server return to client via socket  
          throw 'cannot have letters in zip_code check your JSON Object';
        }

        data_fileds[index].push(value)
      }
      index++
    };

    data_fileds.forEach(fields => {
      //insert_into_users_table(fields)

    })
  }
}


/**
 * @param {object} data_base_object - static object of sql table values to prevent making calls to database
 * @param {TYPE} client - client to make query calls. 
 */
function sql(data_base_object, client) {
  // const data_base_object = data_base_object;
  return {
    sql_table_params
  }

  /**
   * @param {String} table_name - name of the table.
   *@param {parameters} param - array of table fields
   */
  function sql_table_params(table_name, table_fields) {
    const table = table_name;
    const params = table_fields;
    const table_create = table_fields.map(param_name => param_name[0] + `varchar(${param_name[1]}) NOT NULL`).join(',');
    return {
      create_table,
      insert_into_table
    }

    function create_table() {
      if (data_base_object[table_name]) return 'table already exists'
      execute_sql(
        `CREATE TABLE IF NOT EXISTS ${table}(
      id SERIAL NOT NULL primary key,
      ${table_create}
      );`)
    }
    /**
     * @param {values} values - array of values to insert into table
     */
    function insert_into_table(values) {
      if (values.length === table_fields.length)
        execute_sql(`INSERT INTO ${table}(${params.join(",")}) VALUES(${values.map((_,i)=>$`${i+1}` ).join(",")})`);

    };
    /**
     * @param {string} statment- sql statment
     * @param {TYPE} values - array of parameterised sql values
     */
    function execute_sql(statment, values = []) {
      client.query(statment, values, (err, res) => {
        if (err) {
          throw err.stack;
        } else {
          // console.log('succes', res.rows)
        }
      })
    }
  }
}



class Tests extends JSON_PARSER {
  constructor() {
    super();

    this.tests = []
  }
  /**
   if all results that go from 1 to 9 and a to  z match all items in the database, 
   that is enough to say our search is correct 
   * 
   * 
   **/
  test_all_search_results_match_index_in_database() {

    // const exclude_overlap = {}
    // let index = 0
    // for (let i = '0'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
    //   if (i === 58) i = 'a'.charCodeAt()
    //   let letter = String.fromCharCode(i)
    //   const [arry_results, results_deck] = this.find(letter, true)
    //   if (arry_results.constructor === Array) {
    //     arry_results.forEach((fields, i) => {
    //       if (!exclude_overlap[results_deck[i][1]]) {
    //         exclude_overlap[results_deck[i][1]] = 1
    //       } else {
    //         return;
    //       }
    //       for (let values in fields) {

    //         const found_match = Object.keys(this.data_base).some(key => {

    //           return this.data_base[key][results_deck[i][1]] === fields[values]

    //         });
    //         if (found_match) {
    //           index++
    //           break;
    //         }
    //       }
    //     })
    //   }
    // }
    // for (let key in this.data_base) {
    //   let length = this.data_base[key].length
    //   if (index === length) return true;
    //   return false;
    // }
  }

  run_all_tests() {
    let props = [];
    let check = this;
    var obj = this;
    do {
      props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    let excutables = []
    props.sort().forEach(function (e, i, arr) {
      if (e != arr[i + 1] && typeof check[e] == 'function') {
        let m = e.includes('test_')
        if (m) {
          excutables.push(e)
          return false;
        }
      }
      return false;
    });
    let _this = this
    let tests = {};
    excutables.forEach(func => tests[func] = _this[func]() ? 'passed' : 'failed')
    return tests;
  }
}


class Deployment extends Tests {
  constructor(object) {
    super();

    this.express = require("express");
    this.app = this.express();
    this.http = require('http');
    let m = this.http

    this.server = this.http.createServer(this.app);
    let c = this.server

    this.io = require('socket.io').listen(this.server);
    this.server.listen(80);
    this.path = require('path');
    const data_base_object = {}
    // this.sql = sql(data_base_object);
  }
  all_tests_passing() {
    let all_tests = this.run_all_tests()
    // console.log(all_tests)
    return true;
    return Object.values(all_tests).every(test => test === "passed")
  }


  enable_sockets() {
    this.io.httpServer.on('listening', () => {
      console.log('listening on port', this.io.httpServer.address().port)
    })


    this.io.on("connection", (socket) => {


      let last_used = "";
      socket.on('data', (data) => {

        let limit = 1000;
        if (data['query']) {

          let result = this.find(data['query'], data[limit])
          this.io.emit('data', result)
        }
      })

      socket.on('JSON', (data) => {

        if (last_used !== data) {
          last_used = data;
          let obj = JSON.parse(data)
          this.parse_json(obj, true)
        }
      })
    });
  }
  enable_server(Html) {

    this.app.use('/static', this.express.static('node_modules'));
    this.app.use("/static2", this.express.static('views'))
      .set('views', this.path.join(__dirname, '/views'))
      .get('/', (req, res) => res.send(Html)).listen(8080, () => console.error)

  }
  deploy(html) {

    if (this.all_tests_passing() || true) {
      this.enable_sockets()
      this.enable_server(html)
    } else console.error('test not passing')

  }
  listeners() {
    var socket = io('http://localhost:80');
    const data_html_nodes = [];
    const node_dic = {};
    Array.from(document.querySelectorAll('[id]')).forEach(node => node_dic[node.id] = []);

    const limit = document.getElementById('limit')
    const frag = document.createDocumentFragment()
    const list = document.getElementById("news-list");
    const all_id = Array.from(document.querySelectorAll('[id]')).map(node => node.id)

    // tables should be more than one column
    let dom_ids = {
      dom_ids: {
        id: all_id,
        random: ['some_stuff']
      }
    }

    socket.emit('sql', dom_ids)


    const text_box = document.getElementById('text_box')

    socket.on('data', (data) => {
      if (data.constructor === String) {
        node_dic['text_box'].forEach(item => item.remove())
        list.innerHTML = '<p>' + data + '</p>'
      } else {







        generate_section_nodes('news-list', data, ['span', 'p'])
        let data_set = data.slice(0, 5)

        generate_section_nodes('browsers', data_set, ['option', 'p'])

        d3_reset_data(document.getElementById("text_box").value, data)

      }
    })
    let detect_change;
    let timer;
    document.addEventListener('keydown', (event) => {

      if (event.target.id === text_box.id) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          let text = event.target.value ? event.target.value.trim() : ""
          if (detect_change !== text) {
            detect_change = text;
            let more_options = text

            if (more_options.length >= 1) {
              // console.log('more options--', more_options)
              if (text) {
                socket.emit('data', {
                  query: more_options,
                  limit: limit.value
                })
              }
              if (!text) {
                node_dic['news-list'].forEach(item => item.remove())
                node_dic['news-list'].length = 0;
              }
            }
          }

        }, 340);

      }

    })

    const parser = document.getElementById("json_parse")
    parser.addEventListener('paste', function (event) {
      let paste = (event.clipboardData || window.clipboardData).getData('text');
      if (isJson(paste)) {
        socket.emit('JSON', paste)
      }
    })

    const isJson = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        //Error
        //JSON is not okay
        return false;
      }
      return true;
    }
  }
}



// const start_deployment = new Deployment(object)
// start_deployment.deploy()


class Script extends Deployment {
  constructor(JSON_object, search_across_params = ['first_name', 'middle_name', 'last_name', 'zip_code'], size = 5) {
    super(JSON_object, search_across_params)
    this.search_across_params = search_across_params
    this.search_across_params.forEach(param => this.data_base[param] = []);
    this.parse_json(JSON_object, true)
    this.insert_into_database()

    this.page_size = size;
    this.section = {};
    this.cached_sections = {}

  }


  send_client() {
    const client = this.engine()
    this.deploy(client)
  }

  engine() {
    let scripts = ['listeners', 'd3', 'update_section_nodes', 'remove_section_nodes', 'generate_section_nodes']
    return scripts.map(script => {
      let fuc = ("" + this[script]);
      return fuc.slice(fuc.indexOf("{") + 1, fuc.lastIndexOf("}"))
    }).join("\n")
  }


  update_section_nodes(section, list) {
    function update_section_nodes(section, list) {
      if (this.section[section].length) {
        list.forEach((item, i) => {
          let node = this.section[section][i]
          if (node.tagName.toLowerCase() === "p")
            node.innerText = item;
        })
      }
    }

  }
  remove_section_nodes(section_name) {
    function remove_section_nodes(section_name) {
      if (node_dic[section_name]) {
        node_dic[section_name].forEach(element => element.remove())
        node_dic[section_name].length = 0;
      }
    }

  }
  generate_section_nodes() {
    /**
     * @param section_name string
     * @param {array} items - array of elements
     * @param {array} template - string elements
     *
     */
    function generate_section_nodes(section_name, items, template) {

      remove_section_nodes(section_name);
      let frag = document.createDocumentFragment();
      let id = document.getElementById(section_name);

      items = items.map(item => {
        let temp = template.slice();
        let first_elementChild = document.createElement(temp.shift());
        node_dic[section_name].push(first_elementChild);
        let parent_node = first_elementChild;
        while (temp.length) {
          first_elementChild.appendChild(document.createElement(temp.shift()))
          first_elementChild = first_elementChild.firstElementChild;
        }
        first_elementChild.innerHTML = Object.entries(item).reduce((str, values) => str + values.join(":") + '\n', '')
        return parent_node;
      }).reverse()
      items.forEach(element => {
        frag.appendChild(element)

      })

      id.appendChild(frag);
      node_dic[section_name] = items;

    };
  }
  d3() {

    var width = 960,
      height = 900;
    var svg = d3.select("#d3").append("svg")
      .attr("width", width)
      .attr("height", height);

    function d3_reset_data(source, linkss) {
      d3.json("static2/tree.json", function (error, links) {
        links = linkss;
        svg.selectAll('*').remove();
        var nodes = {};
        // console.log(links)
        // Compute the distinct nodes from the links.

        links.forEach(function (link, i) {

          link.source = nodes[source] || (nodes[source] = {
            name: source
          });
          link.target = nodes[i] || (nodes[i] = {
            name: Object.entries(link).filter(item => item[1].constructor === String).reduce((pair, item) => pair.concat(item).replace(",", " : ") + "  ", "")
          });
          link.value = Object.values(link).join(" ");
        });

        var force = d3.layout.force()
          .nodes(d3.values(nodes))
          .links(links)
          .size([width, height])
          .linkDistance(60)
          .charge(-300)
          .on("tick", tick)
          .start();

        // build the arrow.
        svg.append("svg:defs").selectAll("marker")
          .data(["end"])
          .enter().append("svg:marker")
          .attr("id", String)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 15)
          .attr("refY", -1.5)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

        // add the links and the arrows
        var path = svg.append("svg:g").selectAll("path")
          .data(force.links())
          .enter().append("svg:path")
          .attr("class", "link")
          .attr("marker-end", "url(#end)");

        // define the nodes
        var node = svg.selectAll(".node")
          .data(force.nodes())
          .enter().append("g")
          .attr("class", "node")
          .call(force.drag);

        // add the nodes
        node.append("circle")
          .attr("r", 5);

        // add the text 
        node.append("text")
          .attr("x", 12)
          .attr("dy", ".35em")
          .text(function (d) {
            return d.name;
          });
        //edge paths

        edgepaths = svg.selectAll(".edgepath")
          .data(links)
          .enter()
          .append('path')
          .attrs({
            'class': 'edgepath',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'id': function (d, i) {
              return 'edgepath' + i
            }
          })
          .style("pointer-events", "none");

        edgelabels = svg.selectAll(".edgelabel")
          .data(links)
          .enter()
          .append('text')
          .style("pointer-events", "none")
          .attrs({
            'class': 'edgelabel',
            'id': function (d, i) {
              return 'edgelabel' + i
            },
            'font-size': 10,
            'fill': '#aaa'
          });

        edgelabels.append('textPath')
          .attr('xlink:href', function (d, i) {
            return '#edgepath' + i
          })
          .style("text-anchor", "middle")
          .style("pointer-events", "none")
          .attr("startOffset", "50%")
          .text(function (d) {
            return d.type
          });
        // add the curvy lines
        function tick() {
          path.attr("d", function (d) {
            var dx = d.target.x - d.source.x,
              dy = d.target.y - d.source.y,
              dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
              d.source.x + "," +
              d.source.y + "A" +
              dr + "," + dr + " 0 0,1 " +
              d.target.x + "," +
              d.target.y;
          });

          node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

          edgepaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
          });

          edgelabels.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
              var bbox = this.getBBox();

              rx = bbox.x + bbox.width / 2;
              ry = bbox.y + bbox.height / 2;
              return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
              return 'rotate(0)';
            }
          });
        }
      });
    }

  }
  body() {
    return `<div id="d3"></div>
        <div class="wrapper">
        <header class="header"><span class="c"><h3>Search</h3><input list="browsers"  placeholder="search"  id="text_box" type="text"  /><datalist id="browsers"> </datalist>
        </span><span class="d"><h3>Limit Results</h3><input  id="limit" value="1000" type="number" /></span></header>
        <aside class="sidebar"><textarea id="json_parse" ></textarea></aside>
        <article class="content">
        <h1>Results</h1>
        <p><div class="e" id="news-list"></div></p>
        </article>
        <footer class="footer"></footer>
        </div>`
  }
  script_lib() {
    return `<script src="static/socket.io-client/dist/socket.io.js"></script> 
        <script src="https://d3js.org/d3-dispatch.v2.min.js"></script>
        <script src="https://d3js.org/d3-quadtree.v2.min.js"></script>
        <script src="https://d3js.org/d3-timer.v2.min.js"></script>
        <script src="https://d3js.org/d3-force.v2.min.js"></script>
         <script type="text/javascript" src="https://d3js.org/d3.v3.min.js"></script>
         <script src="https://d3js.org/d3-selection-multi.v1.js"></script>
        `
  }
  scripts() {
    return `document.addEventListener("DOMContentLoaded", function() {

        ${this.engine()}
    });
    `
  }
  html() {
    return [`<!DOCTYPE html><html><head>`, `<style> ${this.css()}</style>`, `</head><body>`, this.body(), this.script_lib(), `<script id="script1"> ${this.scripts()} </script>`, `</body></html></script></body></html>`].join("")
  }
  css() {
    return `*, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    margin: 40px;
    font-family: 'Open Sans', 'sans-serif';
    background-color: #fff;
    color: #444;
  }

  h1, p {
    margin: 0 0 1em 0;
  }
  .wrapper {
    max-width: 940px;
    margin: 0 20px;
    display: grid;
    grid-gap: 10px;
    max-height: 100%;
  }
  @media screen and (min-width: 500px) {
    /* no grid support? */
    .sidebar {
      float: left;
      width: 19.1489%;
    }
    .content {
      float: right;
      width: 79.7872%;
    }
    .wrapper {
      margin: 0 auto;
      grid-template-columns: 1fr 3fr;
    }
    .header, .footer {
      grid-column: 1 / -1;
      /* needed for the floated layout */
      clear: both;
      display: grid;
    }
    h3 {
        margin:20px;
    }
  input {
      font-size: 13px;
      padding: 5px;
      border-radius:5px;
      margin:20px;
      width:200px;
  }
  textarea{
    font-size: 13px;
    padding: 5px;
    border-radius:5px;
    margin:20px;
    width:300px;
    height:300px;
  }
  }
  .wrapper > * {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
    /* needed for the floated layout*/
    margin-bottom: 10px;
  }
  /* We need to set the widths used on floated items back to auto, and remove the bottom margin as when we have grid we have gaps. */
  @supports (display: grid) {
    .wrapper > * {
      width: auto;
      margin: 0;
    }
  }
  .c {
    grid-column: 1 / 2 ;
    grid-row: 2 ;
  }
  .d {
    grid-column: 2 / 5 ;
    grid-row: 2 ;
  }
  span{
      display:grid;
    grid-gap: 10px;
    grid-template-columns: minmax(100px, 1fr) 100px 100px;
  }
  path.link {
    fill: none;
    stroke: #666;
    stroke-width: 1.5px;
  }
  circle {
    fill: #ccc;
    stroke: #fff;
    stroke-width: 1.5px;
  }
  text {
    fill: #000;
    font: 10px sans-serif;
    pointer-events: none;
  }`
  }

}

const fo = require('fs').promises;
const {
  filter
} = require("./lib/commandLoader");
(async () => {
  let data = await fo.readFile("data.json", "utf8");
  data = data.toLocaleLowerCase();
  data = eval(data);
  object = data;
  let script = new Script(data, search_across_params = ['first_name', 'middle_name', 'last_name', 'zip_code'])
  let html = script.html()
  script.deploy(html)


})()

// let object = {
//   "id": "0001",
//   "type": "donut",
//   "name": "Cake",
//   "ppu": "0.55",
//   "whatever": {
//     "first_name": "wassaf",
//     "last_name": "iswonderfull",
//     "zip_code": "00210"
//   },
//   "bob": [{
//     "first_name": "mark",
//     "middle_name": "kiss",
//     "last_name": "my",
//     "zip_code": "00310"
//   }],
//   "whatever2": {
//     "first_name": "wassaf",
//     "last_name": "issleepy"
//   },
//   "whatever3": {
//     "first_name": "wasm",
//     "last_name": "confused"
//   },
//   "whatever4": {
//     "first_name": "wasm",
//     "last_name": "person"
//   },
//   "batters": {
//     "batter": [{
//       "id": "1001",
//       "type": "Regular"
//     }, {
//       "id": "1002",
//       "type": "Chocolate"
//     }, {
//       "id": "1003",
//       "type": "Blueberry"
//     }, {
//       "id": "1004",
//       "type": "Devil's Food"
//     }]
//   },
//   "topping": [{
//     "id": "5001",
//     "type": "None"
//   }, {
//     "id": "5002",
//     "type": "Glazed"
//   }, {
//     "id": "5005",
//     "type": "Sugar"
//   }, {
//     "id": "5007",
//     "type": "Powdered Sugar"
//   }, {
//     "id": "5006",
//     "type": "Chocolate with Sprinkles"
//   }, {
//     "id": "5003",
//     "type": "Chocolate"
//   }, {
//     "id": "5004",
//     "type": "Maple"
//   }]
// }
// let script = new Script()

// let html = script.html()
// //  console.log(html)

// script.deploy(html)