import 'package:flutter/material.dart';
import 'package:navigate/navigate.dart';

import 'package:paulvanbike/widgets/link_icon.dart';


TextStyle detailsStyle() => TextStyle(color: Colors.grey[600], fontSize: 13);

class ListItem extends StatelessWidget {
    final dynamic item;
    ListItem(this.item);

    @override
    Widget build(BuildContext context) {

        return InkWell(
            child: Container(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                        Container(
                            child: Text(
                                item['title'].toUpperCase(),
                                style:TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            padding: EdgeInsets.only(bottom: 15),
                        ),
                        Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                                item['image'] != null
                                    ? Container(
                                        child: Image.asset('assets/images/${item['image']}', width: 80, height: 80, fit: BoxFit.cover),
                                        padding: EdgeInsets.only(right: 10),
                                    )
                                    : Container(),
                                item['desc'] != null
                                    ? Expanded(child: Text(
                                        item['desc'],
                                        maxLines: 4,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(fontSize: 15, letterSpacing: -0.6),
                                    ))
                                    : Container(),
                            ],
                        ),
                        Container(
                            child: Row(children: [
                                Expanded(child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                        item['pricetag'] != null
                                            ? Text('Ценник: ${item['pricetag']}', style: detailsStyle())
                                            : Container(),
                                        item['address'] != null
                                            ? Text('Адрес: ${item['address']}', style: detailsStyle())
                                            : Container(),
                                    ],
                                )),
                                LinkIcon(link: item['phone'], type: 'phone', icon: 'local_phone', color: Colors.blueGrey[200]),
                                LinkIcon(
                                    link: item['address_full'],
                                    lat: item['lng'],
                                    lng: item['lng'],
                                    type: 'map',
                                    icon: 'map',
                                    color: Colors.blueGrey[200]
                                ),
                                LinkIcon(link: item['website'], type: 'url', icon: 'globe', color: Colors.blueGrey[200]),
                            ]),
                            margin: EdgeInsets.only(top: 15),
                        ),
                    ]
                ),
                margin: EdgeInsets.only(bottom: 35),
            ),
            onTap: () => Navigate.navigate(context, '/item', arg: {'item': item}),
        );
    }
}
