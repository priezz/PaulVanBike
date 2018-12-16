import 'package:flutter/material.dart';

import 'package:paulvanbike/widgets/link_icon.dart';
import 'package:paulvanbike/widgets/statusbar.dart';


final TextStyle detailsStyle = TextStyle(color: Colors.white, fontSize: 14);

class Item extends StatelessWidget {
    final dynamic item;
    Item(this.item);

    @override
    Widget build(BuildContext context) => Scaffold(body: Stack(children: [
        Container(child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
                Stack(children: [
                    Image.asset(
                        'assets/images/${item['image']}',
                        fit: BoxFit.cover,
                        height: MediaQuery.of(context).size.height / 2,
                        width: MediaQuery.of(context).size.width,
                    ),
                    Container(
                        height: MediaQuery.of(context).size.height / 2,
                        decoration: BoxDecoration(
                            color: Colors.white,
                            gradient: LinearGradient(
                                begin: FractionalOffset.topCenter,
                                end: FractionalOffset.bottomCenter,
                                colors: [
                                    Colors.black87,
                                    Colors.grey.withOpacity(0.0),
                                    Colors.grey.withOpacity(0.0),
                                    Colors.black87,
                                ],
                                stops: [0, 0.3, 0.7, 1],
                            ),
                        ),
                    ),
                    Container(
                        height: MediaQuery.of(context).size.height / 2,
                        padding: EdgeInsets.symmetric(horizontal: 25, vertical: 10),

                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                                Expanded(child: Column(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                        item['pricetag'] != null
                                            ? Text('Ценник: ${item['pricetag']}', style: detailsStyle)
                                            : Container(),
                                        item['address'] != null
                                            ? Text('Адрес: ${item['address']}', style: detailsStyle)
                                            : Container(),
                                    ],
                                )),
                                LinkIcon(link: item['phone'], type: 'phone', icon: 'local_phone'),
                                LinkIcon(
                                    link: item['address_full'],
                                    lat: item['lng'],
                                    lng: item['lng'],
                                    type: 'map',
                                    icon: 'map',
                                ),
                                LinkIcon(link: item['website'], type: 'url', icon: 'globe'),
                            ],
                        ),
                    ),
                ]),
                Expanded(child: Container(
                    child: Text(
                        item['desc'] ?? '',
                        style: TextStyle(fontSize: 16),
                    ),
                    padding: EdgeInsets.fromLTRB(25, 15, 20, 0),
                )),
            ]
        )),
        Container(
            height: 100.0,
            child: AppBar(
                backgroundColor: Colors.transparent,
                elevation: 0,
                iconTheme: IconThemeData(color: Colors.white),
                title: Text(item['title'], style: TextStyle(color: Colors.white)),
            ),
        ),
        StatusBar('light'),
    ]));
}
